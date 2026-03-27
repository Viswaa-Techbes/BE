const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { jwtSecret, jwtExpiresIn } = require('../config/env.config');

const signToken = (userId) => {
  return jwt.sign({ sub: userId }, jwtSecret, { expiresIn: jwtExpiresIn });
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError({ message: 'Invalid email or password', status: 401 });
  }

  if (user.status !== 'active') {
    throw new ApiError({ message: 'User is not active', status: 403 });
  }

  const token = signToken(user.id);

  return {
    token,
    user: await User.findById(user.id).select('-password'),
  };
};

const register = async ({ name, email, password, role = 'customer' }) => {
  if (await User.findOne({ email })) {
    throw new ApiError({ message: 'Email already in use', status: 409 });
  }

  const user = await User.create({ name, email, password, role });

  return {
    token: signToken(user.id),
    user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status },
  };
};

const me = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new ApiError({ message: 'User not found', status: 404 });
  return user;
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId).select('+password');
  if (!user) throw new ApiError({ message: 'User not found', status: 404 });

  if (!(await user.matchPassword(currentPassword))) {
    throw new ApiError({ message: 'Current password is incorrect', status: 400 });
  }

  user.password = newPassword;
  await user.save();
  return { message: 'Password updated successfully' };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError({ message: 'User not found', status: 404 });

  const resetToken = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '1h' });
  return { resetToken, message: 'Password reset token generated' };
};

const resetPassword = async (token, newPassword) => {
  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findById(payload.sub).select('+password');
    if (!user) throw new ApiError({ message: 'User not found', status: 404 });

    user.password = newPassword;
    await user.save();
    return { message: 'Password reset successful' };
  } catch (err) {
    throw new ApiError({ message: 'Invalid or expired reset token', status: 400 });
  }
};

module.exports = { login, register, me, changePassword, forgotPassword, resetPassword };
