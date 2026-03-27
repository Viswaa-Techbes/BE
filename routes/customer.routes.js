const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const customerController = require('../controllers/customer.controller');

// All customer routes are protected and require user role
router.use(protect);
router.use(authorize('user', 'admin'));

router.post('/jobs', customerController.bookService);
router.get('/jobs', customerController.getMyJobs);

module.exports = router;
