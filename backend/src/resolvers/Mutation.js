const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { APP_SECRET } = require('../config');

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
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new WrongCredentialsError();
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new WrongCredentialsError();
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  };
}

async function createPost(parent, args, context) {
  const userId = context.request.isAuthenticated && context.request.userId;
  if (!userId)
    throw new UnauthenticatedError();

  return await context.prisma.createPost({
    content: args.content,
    postedBy: { connect: { id: userId } }
  });
}

module.exports = {
  signup: ErrorHandlerWrapper(signup),
  login: ErrorHandlerWrapper(login),
  createPost: ErrorHandlerWrapper(createPost)
};
