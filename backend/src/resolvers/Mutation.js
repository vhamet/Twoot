const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { APP_SECRET } = require('../secret');

const {
  WrongCredentialsError,
  UsernameAlreadyTakenError,
  EmailAlreadyTakenError,
  UnauthenticatedError
} = require('./ErrorHandling/Errors');
const { ErrorHandlerWrapper } = require('./ErrorHandling/ErrorHandlerWrapper');

async function signup(parent, args, context) {
  try {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({ ...args, password });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user
    };
  } catch (err) {
    if (err.toString().includes('Field name = email'))
      throw new EmailAlreadyTakenError();
    else if (err.toString().includes('Field name = username'))
      throw new UsernameAlreadyTakenError();

    throw err;
  }
}

async function login(parent, args, context) {
  const selector =
    args.login.indexOf('@') < 0
      ? { username: args.login }
      : { email: args.login };
  const user = await context.prisma.user(selector);
  if (!user) {
    throw new WrongCredentialsError();
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new WrongCredentialsError();
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  context.response.cookie('token', token, { httpOnly: true });
  return {
    token,
    user
  };
}

async function createPost(parent, args, context) {
  const userId = context.request.isAuthenticated && context.request.userId;
  if (!userId) throw new UnauthenticatedError();

  return await context.prisma.createPost({
    content: args.content,
    postedBy: { connect: { id: userId } }
  });
}

async function createComment(parent, args, context) {
  const userId = context.request.isAuthenticated && context.request.userId;
  if (!userId) throw new UnauthenticatedError();

  return await context.prisma.createComment({
    content: args.content,
    postedOn: { connect: { id: args.postId } },
    postedBy: { connect: { id: userId } }
  });
}

async function addFriend(parent, args, context) {
  const userId = context.request.isAuthenticated && context.request.userId;
  if (!userId) throw new UnauthenticatedError();

  await context.prisma.updateUser({
    where: { id: userId },
    data: { friends: { connect: { id: args.friendId }} },
  });
  await context.prisma.updateUser({
    where: { id: args.friendId },
    data: { friends: { connect: { id: userId }} },
  });

  return true;
}

module.exports = {
  signup: ErrorHandlerWrapper(signup),
  login: ErrorHandlerWrapper(login),
  createPost: ErrorHandlerWrapper(createPost),
  createComment: ErrorHandlerWrapper(createComment),
  addFriend: ErrorHandlerWrapper(addFriend)
};
