const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { APP_SECRET } = require('../secret');
const { getAuthenticatedUserId } = require('../utils');

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
  const userId = getAuthenticatedUserId(context);
  return await context.prisma.createPost(
    Object.assign(
      {
        content: args.content,
        isPrivate: args.isPrivate,
        postedBy: { connect: { id: userId } }
      },
      args.postedOn ? { postedOn: { connect: { id: args.postedOn } } } : null
    )
  );
}

async function createComment(parent, args, context) {
  const userId = getAuthenticatedUserId(context);
  const comment = await context.prisma.createComment({
    content: args.content,
    postedOn: { connect: { id: args.postId } },
    postedBy: { connect: { id: userId } }
  });

  if (args.postById !== userId) {
    await context.prisma.createAlert({
      onComment: { connect: { id: comment.id } },
      seen: false
    });
  }

  return comment;
}

async function follow(parent, args, context) {
  const userId = getAuthenticatedUserId(context);
  await context.prisma.updateUser({
    where: { id: userId },
    data: { following: { connect: { id: args.followId } } }
  });

  await context.prisma.updateUser({
    where: { id: args.followId },
    data: { followers: { connect: { id: userId } } }
  });

  await context.prisma.createAlert({
    onFollower: { connect: { id: userId } },
    onFollowed: { connect: { id: args.followId } },
    seen: false
  });

  return true;
}

async function unfollow(parent, args, context) {
  const userId = getAuthenticatedUserId(context);
  await context.prisma.updateUser({
    where: { id: userId },
    data: { following: { disconnect: { id: args.followId } } }
  });

  await context.prisma.updateUser({
    where: { id: args.followId },
    data: { followers: { disconnect: { id: userId } } }
  });

  return true;
}

async function likePost(parent, args, context) {
  const userId = getAuthenticatedUserId(context);
  await context.prisma.updatePost({
    where: { id: args.postId },
    data: { likes: { connect: { id: userId } } }
  });

  return true;
}

async function unlikePost(parent, args, context) {
  const userId = getAuthenticatedUserId(context);
  await context.prisma.updatePost({
    where: { id: args.postId },
    data: { likes: { disconnect: { id: userId } } }
  });

  return true;
}

async function likeComment(parent, args, context) {
  const userId = getAuthenticatedUserId(context);
  await context.prisma.updateComment({
    where: { id: args.commentId },
    data: { likes: { connect: { id: userId } } }
  });

  return true;
}

async function unlikeComment(parent, args, context) {
  const userId = getAuthenticatedUserId(context);
  await context.prisma.updateComment({
    where: { id: args.commentId },
    data: { likes: { disconnect: { id: userId } } }
  });

  return true;
}

async function updateReadAlert(parent, args, context) {
  await context.prisma.updateAlert({
    where: { id: args.alertId },
    data: { seen: args.seen }
  });

  return true;
}

async function sendMessage(parent, args, context) {
  const userId = getAuthenticatedUserId(context);
  const message = await context.prisma.createMessage({
    from: { connect: { id: userId } },
    to: { connect: { id: args.toUser } },
    content: args.content,
    seen: false
  });

  return message;
}

module.exports = {
  signup: ErrorHandlerWrapper(signup),
  login: ErrorHandlerWrapper(login),
  createPost: ErrorHandlerWrapper(createPost),
  createComment: ErrorHandlerWrapper(createComment),
  follow: ErrorHandlerWrapper(follow),
  unfollow: ErrorHandlerWrapper(unfollow),
  likePost: ErrorHandlerWrapper(likePost),
  unlikePost: ErrorHandlerWrapper(unlikePost),
  likeComment: ErrorHandlerWrapper(likeComment),
  unlikeComment: ErrorHandlerWrapper(unlikeComment),
  updateReadAlert: ErrorHandlerWrapper(updateReadAlert),
  sendMessage: ErrorHandlerWrapper(sendMessage)
};
