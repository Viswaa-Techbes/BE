require('dotenv').config();

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  env: ENV,
  port: Number(process.env.PORT) || 5000,
  mongodbUri: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/technician_app',
  jwtSecret: process.env.JWT_SECRET || 'supersecretkey',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  cookieName: process.env.COOKIE_NAME || 'auth-token',
  cookieExpires: Number(process.env.COOKIE_EXPIRES_DAYS || 7),
};