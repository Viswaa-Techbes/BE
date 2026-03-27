const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const technicianController = require('../controllers/technician.controller');

// All technician routes are protected and require technician role
router.use(protect);
router.use(authorize('technician'));

router.get('/jobs', technicianController.getMyJobs);
router.patch('/jobs/:id/status', technicianController.updateJobStatus);

module.exports = router;
