const authService = require('../services/auth.service');
const ApiError = require('../utils/ApiError');
const apiResponse = require('../utils/apiResponse');
const { cookieName, cookieExpires } = require('../config/env.config');

const setTokenCookie = (res, token) => {
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: cookieExpires * 24 * 60 * 60 * 1000,
  });
};

const login = async (req, res, next) => {
  try {
    const { token, user } = await authService.login(req.body);
    setTokenCookie(res, token);
    res.status(200).json(apiResponse({ success: true, code: 200, data: { user, token }, message: 'Login successful', errors: null }));
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { token, user } = await authService.register(req.body);
    setTokenCookie(res, token);
    res.status(201).json(apiResponse({ success: true, code: 201, data: { user, token }, message: 'Registration successful', errors: null }));
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await authService.me(req.user.id);
    res.status(200).json(apiResponse({ success: true, code: 200, data: user, message: 'Current user fetched', errors: null }));
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie(cookieName, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  res.status(200).json(apiResponse({ success: true, code: 200, data: null, message: 'Logged out', errors: null }));
};

const forgotPassword = async (req, res, next) => {
  try {
    const data = await authService.forgotPassword(req.body.email);
    res.status(200).json(apiResponse({ success: true, code: 200, data, message: 'Reset token generated', errors: null }));
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const data = await authService.resetPassword(req.body.token, req.body.newPassword);
    res.status(200).json(apiResponse({ success: true, code: 200, data, message: 'Password reset', errors: null }));
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const data = await authService.changePassword(req.user.id, req.body);
    res.status(200).json(apiResponse({ success: true, code: 200, data, message: 'Password changed', errors: null }));
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register, me, logout, forgotPassword, resetPassword, changePassword };
