const leadService = require('../services/lead.service');
const apiResponse = require('../utils/apiResponse');

const createLead = async (req, res, next) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json(apiResponse({ success: true, code: 201, data: lead, message: 'Lead created', errors: null }));
  } catch (err) {
    next(err);
  }
};

const getLeads = async (req, res, next) => {
  try {
    const result = await leadService.getLeads(req.query);
    res.status(200).json(apiResponse({ success: true, code: 200, data: result, message: 'Leads retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

module.exports = { createLead, getLeads };
