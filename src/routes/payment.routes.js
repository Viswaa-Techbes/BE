const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createPaymentSchema, idParamSchema, paginationSchema } = require('../validation/payment.validation');

router.post('/', authenticate, authorize('admin','technician','customer'), validate(createPaymentSchema), paymentController.createPayment);
router.get('/:id', authenticate, authorize('admin','technician','customer'), validate(idParamSchema), paymentController.getPaymentById);
router.get('/user/:id', authenticate, authorize('admin','technician','customer'), validate(idParamSchema), paymentController.getPaymentsByUser);

module.exports = router;