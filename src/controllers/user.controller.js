const userService = require('../services/user.service');
const apiResponse = require('../utils/apiResponse');

const getUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers(req.query);
    res.status(200).json(apiResponse({ success: true, code: 200, data: result, message: 'Users retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(apiResponse({ success: true, code: 200, data: user, message: 'User retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(apiResponse({ success: true, code: 200, data: user, message: 'User updated', errors: null }));
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.status(200).json(apiResponse({ success: true, code: 200, data: result, message: 'User deleted', errors: null }));
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };
