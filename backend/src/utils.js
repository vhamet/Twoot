const getAuthenticatedUserId = context => {
  const userId = context.request.isAuthenticated && context.request.userId;
  if (!userId) throw new UnauthenticatedError();

  return userId;
};

module.exports = {
  getAuthenticatedUserId
}