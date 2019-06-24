const { FatalError, handledErrors } = require('./Errors');

const ErrorHandlerWrapper = resolver => async (...args) => {
  try {
    return await resolver(...args);
  } catch (err) {
    if (handledErrors.includes(err.name)) throw err;

    console.log('FatalError:', err.message);
    throw new FatalError({ data: { reason: err.message } });
  }
};

module.exports = {
  ErrorHandlerWrapper
};
