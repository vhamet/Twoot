const { createError } = require('apollo-errors');

const WrongCredentialsError = createError('WrongCredentialsError', {
  message: 'The provided credentials are invalid.'
});

const UsernameAlreadyTakenError = createError('UsernameAlreadyTakenError', {
  message: 'Username already used, please choose another one.'
});

const EmailAlreadyTakenError = createError('EmailAlreadyTakenError', {
  message: 'Email address already used, please choose another one.'
});

const UnauthenticatedError = createError('UnauthenticatedError', {
  message: 'Not authenticated'
});

const FatalError = createError('FatalError', {
  message:
    'Ooops! An error occured processing your request, please try again later.'
});

const handledErrors = [
  'WrongCredentialsError',
  'UsernameAlreadyTakenError',
  'EmailAlreadyTakenError',
  'UnauthenticatedError'
];

module.exports = {
  WrongCredentialsError,
  UsernameAlreadyTakenError,
  EmailAlreadyTakenError,
  UnauthenticatedError,
  FatalError,
  handledErrors
};
