const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../secret');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuthenticated = false;
    return next();
  }
  
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuthenticated = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, APP_SECRET);
  } catch (err) {
    req.isAuthenticated = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuthenticated = false;
    return next();
  }

  req.isAuthenticated = true;
  req.userId = decodedToken.userId;
  next();
}