const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');

// All admin routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/customers', adminController.getCustomers);
router.get('/technicians', adminController.getTechnicians);
router.post('/jobs', adminController.createJob);
router.get('/jobs', adminController.getAllJobs);

module.exports = router;
