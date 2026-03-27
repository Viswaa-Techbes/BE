const jobService = require('../services/job.service');
const apiResponse = require('../utils/apiResponse');

const createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob({ ...req.body, customerId: req.user.id });
    res.status(201).json(apiResponse({ success: true, code: 201, data: job, message: 'Job created', errors: null }));
  } catch (err) {
    next(err);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const result = await jobService.getJobs(req.query);
    res.status(200).json(apiResponse({ success: true, code: 200, data: result, message: 'Jobs retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

const getJob = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    res.status(200).json(apiResponse({ success: true, code: 200, data: job, message: 'Job retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const job = await jobService.updateJob(req.params.id, req.body);
    res.status(200).json(apiResponse({ success: true, code: 200, data: job, message: 'Job updated', errors: null }));
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const result = await jobService.deleteJob(req.params.id);
    res.status(200).json(apiResponse({ success: true, code: 200, data: result, message: 'Job deleted', errors: null }));
  } catch (err) {
    next(err);
  }
};

const updateJobStatus = async (req, res, next) => {
  try {
    const job = await jobService.updateJobStatus(req.params.id, req.body.status);
    res.status(200).json(apiResponse({ success: true, code: 200, data: job, message: 'Job status updated', errors: null }));
  } catch (err) {
    next(err);
  }
};

const getJobsByTechnician = async (req, res, next) => {
  try {
    const result = await jobService.getJobsByTechnician(req.params.id, req.query);
    res.status(200).json(apiResponse({ success: true, code: 200, data: result, message: 'Jobs by technician retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

module.exports = { createJob, getJobs, getJob, updateJob, deleteJob, updateJobStatus, getJobsByTechnician };
