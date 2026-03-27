const express = require('express');
const router = express.Router();

const technicianController = require('../controllers/technician.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { statusSchema } = require('../validation/technician.validation');

router.get('/', authenticate, authorize('admin','technician','customer'), technicianController.getTechnicians);
router.patch('/:id/status', authenticate, authorize('admin'), validate(statusSchema), technicianController.updateTechnicianStatus);
router.get('/me', authenticate, authorize('technician'), technicianController.getTechnicianMe);

module.exports = router;