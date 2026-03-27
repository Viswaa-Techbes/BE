const Lead = require('../models/lead.model');
const ApiError = require('../utils/ApiError');

const createLead = async (data) => {
  const lead = await Lead.create(data);
  return lead;
};

const getLeads = async ({ page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;
  const [leads, total] = await Promise.all([
    Lead.find().skip(skip).limit(limit),
    Lead.countDocuments(),
  ]);

  return { data: leads, meta: { total, page, limit } };
};

module.exports = { createLead, getLeads };
