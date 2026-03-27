const express = require('express');
const router = express.Router();

const leadController = require('../controllers/lead.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createLeadSchema, paginationSchema } = require('../validation/lead.validation');

router.post('/', validate(createLeadSchema), leadController.createLead);
router.get('/', authenticate, authorize('admin'), validate(paginationSchema), leadController.getLeads);

module.exports = router;