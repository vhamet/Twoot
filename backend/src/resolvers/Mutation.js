const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../config');
const { SERVER_ERROR_MESSAGE } = require('../constants');

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
      throw new Error('Email address already used, please choose another one.');
    else if (err.toString().includes('Field name = username'))
      throw new Error('Username already used, please choose another one.');

    throw new Error(SERVER_ERROR_MESSAGE);
  }
}

async function login(parent, args, context) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid credentials');
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  };
}

module.exports = {
  signup,
  login
};
