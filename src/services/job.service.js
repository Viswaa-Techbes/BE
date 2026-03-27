const Job = require('../models/job.model');
const ApiError = require('../utils/ApiError');

const createJob = async (data) => {
  const job = await Job.create(data);
  return job;
};

const getJobs = async ({ page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;
  const [jobs, total] = await Promise.all([
    Job.find().populate('customerId', 'name email').populate('technicianId', 'name email').skip(skip).limit(limit),
    Job.countDocuments(),
  ]);

  return { data: jobs, meta: { total, page, limit } };
};

const getJobById = async (id) => {
  const job = await Job.findById(id).populate('customerId', 'name email').populate('technicianId', 'name email');
  if (!job) throw new ApiError({ message: 'Job not found', status: 404 });
  return job;
};

const updateJob = async (id, updates) => {
  const job = await Job.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!job) throw new ApiError({ message: 'Job not found', status: 404 });
  return job;
};

const deleteJob = async (id) => {
  const job = await Job.findByIdAndDelete(id);
  if (!job) throw new ApiError({ message: 'Job not found', status: 404 });
  return { message: 'Job deleted' };
};

const updateJobStatus = async (id, status) => {
  const job = await Job.findById(id);
  if (!job) throw new ApiError({ message: 'Job not found', status: 404 });
  job.status = status;
  await job.save();
  return job;
};

const getJobsByTechnician = async (technicianId, { page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;
  const [jobs, total] = await Promise.all([
    Job.find({ technicianId }).populate('customerId', 'name email').skip(skip).limit(limit),
    Job.countDocuments({ technicianId }),
  ]);

  return { data: jobs, meta: { total, page, limit } };
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob, updateJobStatus, getJobsByTechnician };
