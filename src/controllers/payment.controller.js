const paymentService = require('../services/payment.service');
const apiResponse = require('../utils/apiResponse');

const createPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.createPayment({ ...req.body, userId: req.user.id });
    res.status(201).json(apiResponse({ success: true, code: 201, data: payment, message: 'Payment created', errors: null }));
  } catch (err) {
    next(err);
  }
};

const getPaymentById = async (req, res, next) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    res.status(200).json(apiResponse({ success: true, code: 200, data: payment, message: 'Payment retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

const getPaymentsByUser = async (req, res, next) => {
  try {
    const result = await paymentService.getPaymentsByUser(req.params.id, req.query);
    res.status(200).json(apiResponse({ success: true, code: 200, data: result, message: 'Payments retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

module.exports = { createPayment, getPaymentById, getPaymentsByUser };
