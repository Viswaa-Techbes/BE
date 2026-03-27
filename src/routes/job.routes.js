const express = require('express');
const router = express.Router();

const jobController = require('../controllers/job.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createJobSchema, updateJobSchema, jobIdParamSchema, statusSchema, paginationSchema } = require('../validation/job.validation');

router.post('/', authenticate, authorize('admin','technician','customer'), validate(createJobSchema), jobController.createJob);
router.get('/', authenticate, authorize('admin','technician','customer'), validate(paginationSchema), jobController.getJobs);
router.get('/:id', authenticate, authorize('admin','technician','customer'), validate(jobIdParamSchema), jobController.getJob);
router.patch('/:id', authenticate, authorize('admin','technician','customer'), validate(updateJobSchema), jobController.updateJob);
router.delete('/:id', authenticate, authorize('admin','technician','customer'), validate(jobIdParamSchema), jobController.deleteJob);
router.patch('/:id/status', authenticate, authorize('admin','technician'), validate(statusSchema), jobController.updateJobStatus);
router.get('/technician/:id', authenticate, authorize('admin','technician'), validate(jobIdParamSchema), jobController.getJobsByTechnician);

module.exports = router;