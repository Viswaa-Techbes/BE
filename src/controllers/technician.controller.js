const technicianService = require('../services/technician.service');
const apiResponse = require('../utils/apiResponse');

const getTechnicians = async (req, res, next) => {
  try {
    const result = await technicianService.getTechnicians(req.query);
    res.status(200).json(apiResponse({ success: true, code: 200, data: result, message: 'Technicians retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

const updateTechnicianStatus = async (req, res, next) => {
  try {
    const tech = await technicianService.updateStatus(req.params.id, req.body.status);
    res.status(200).json(apiResponse({ success: true, code: 200, data: tech, message: 'Technician status updated', errors: null }));
  } catch (err) {
    next(err);
  }
};

const getTechnicianMe = async (req, res, next) => {
  try {
    const record = await technicianService.getMyProfile(req.user.id);
    res.status(200).json(apiResponse({ success: true, code: 200, data: record, message: 'Technician profile retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

module.exports = { getTechnicians, updateTechnicianStatus, getTechnicianMe };
