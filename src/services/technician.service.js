const Technician = require('../models/technician.model');
const ApiError = require('../utils/ApiError');

const createOrUpdateTechnician = async (userId, data) => {
  const record = await Technician.findOneAndUpdate({ userId }, data, { new: true, upsert: true, setDefaultsOnInsert: true });
  return record;
};

const getTechnicians = async ({ page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;
  const [techs, total] = await Promise.all([
    Technician.find().skip(skip).limit(limit).populate('userId', 'name email'),
    Technician.countDocuments(),
  ]);
  return { data: techs, meta: { total, page, limit } };
};

const updateStatus = async (id, status) => {
  const tech = await Technician.findById(id);
  if (!tech) throw new ApiError({ message: 'Technician not found', status: 404 });
  tech.status = status;
  await tech.save();
  return tech;
};

const getMyProfile = async (userId) => {
  const tech = await Technician.findOne({ userId }).populate('userId', 'name email role status');
  if (!tech) throw new ApiError({ message: 'Technician profile not found', status: 404 });
  return tech;
};

module.exports = { createOrUpdateTechnician, getTechnicians, updateStatus, getMyProfile };
