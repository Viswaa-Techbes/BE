const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');

// GET all jobs
router.get('/', jobController.getAllJobs);

// POST create a new job
router.post('/', jobController.createJob);

// PUT update job status by ID
router.put('/:id', jobController.updateJobStatus);

// POST Timer APIs
router.post('/:id/start', jobController.startJob);
router.post('/:id/pause', jobController.pauseJob);
router.post('/:id/resume', jobController.resumeJob);
router.post('/:id/complete', jobController.completeJob);

module.exports = router;
