const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const getAllUsers = async ({ page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find().select('-password').skip(skip).limit(limit),
    User.countDocuments(),
  ]);

  return { data: users, meta: { total, page, limit } };
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new ApiError({ message: 'User not found', status: 404 });
  return user;
};

const updateUser = async (id, updates) => {
  if (updates.email) {
    const exists = await User.findOne({ email: updates.email, _id: { $ne: id } });
    if (exists) throw new ApiError({ message: 'Email already in use', status: 409 });
  }

  const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select('-password');
  if (!user) throw new ApiError({ message: 'User not found', status: 404 });
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ApiError({ message: 'User not found', status: 404 });
  return { message: 'User deleted' };
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
