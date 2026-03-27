const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');

// POST /api/location/update
router.post('/update', locationController.updateLocation);

// GET /api/location/:technicianId
router.get('/:technicianId', locationController.getLiveLocation);

module.exports = router;
