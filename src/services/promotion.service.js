const Promotion = require('../models/promotion.model');
const ApiError = require('../utils/ApiError');

const createPromotion = async (data) => {
  if (await Promotion.findOne({ code: data.code.toUpperCase() })) {
    throw new ApiError({ message: 'Promotion code already exists', status: 409 });
  }

  const promotion = await Promotion.create({ ...data, code: data.code.toUpperCase() });
  return promotion;
};

const getPromotionByCode = async (code) => {
  const promotion = await Promotion.findOne({ code: code.toUpperCase(), active: true, expiry: { $gt: new Date() } });
  if (!promotion) throw new ApiError({ message: 'Promotion not found or expired', status: 404 });
  return promotion;
};

const getActivePromotions = async ({ page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;
  const [promotions, total] = await Promise.all([
    Promotion.find({ active: true, expiry: { $gt: new Date() } }).skip(skip).limit(limit),
    Promotion.countDocuments({ active: true, expiry: { $gt: new Date() } }),
  ]);

  return { data: promotions, meta: { total, page, limit } };
};

module.exports = { createPromotion, getPromotionByCode, getActivePromotions };
