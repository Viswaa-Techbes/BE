const Payment = require('../models/payment.model');
const ApiError = require('../utils/ApiError');

const createPayment = async (data) => {
  const payment = await Payment.create(data);
  return payment;
};

const getPaymentById = async (id) => {
  const payment = await Payment.findById(id).populate('userId', 'name email').populate('jobId');
  if (!payment) throw new ApiError({ message: 'Payment not found', status: 404 });
  return payment;
};

const getPaymentsByUser = async (userId, { page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;
  const [payments, total] = await Promise.all([
    Payment.find({ userId }).populate('jobId').skip(skip).limit(limit),
    Payment.countDocuments({ userId }),
  ]);

  return { data: payments, meta: { total, page, limit } };
};

module.exports = { createPayment, getPaymentById, getPaymentsByUser };
