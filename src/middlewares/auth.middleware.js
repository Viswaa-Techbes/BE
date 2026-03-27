const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');
const { jwtSecret, cookieName } = require('../config/env.config');

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies?.[cookieName] ||
      req.headers.authorization?.split(' ')[0].toLowerCase() === 'bearer'
        ? req.headers.authorization.split(' ')[1]
        : null;

    if (!token) {
      return next(new ApiError({ message: 'Authentication token missing', status: 401 }));
    }

    const payload = jwt.verify(token, jwtSecret);

    const user = await User.findById(payload.sub).select('-password');
    if (!user) {
      return next(new ApiError({ message: 'User not found', status: 401 }));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError({ message: 'Invalid token', status: 401 }));
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return next(new ApiError({ message: 'Unauthorized', status: 401 }));
  }

  if (!roles.includes(req.user.role)) {
    return next(new ApiError({ message: 'Forbidden', status: 403 }));
  }

  next();
};

module.exports = { authenticate, authorize };