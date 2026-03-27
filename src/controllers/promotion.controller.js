const promotionService = require('../services/promotion.service');
const apiResponse = require('../utils/apiResponse');

const createPromotion = async (req, res, next) => {
  try {
    const promotion = await promotionService.createPromotion(req.body);
    res.status(201).json(apiResponse({ success: true, code: 201, data: promotion, message: 'Promotion created', errors: null }));
  } catch (err) {
    next(err);
  }
};

const getPromotionByCode = async (req, res, next) => {
  try {
    const promotion = await promotionService.getPromotionByCode(req.params.code);
    res.status(200).json(apiResponse({ success: true, code: 200, data: promotion, message: 'Promotion retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

const getActivePromotions = async (req, res, next) => {
  try {
    const result = await promotionService.getActivePromotions(req.query);
    res.status(200).json(apiResponse({ success: true, code: 200, data: result, message: 'Active promotions retrieved', errors: null }));
  } catch (err) {
    next(err);
  }
};

module.exports = { createPromotion, getPromotionByCode, getActivePromotions };
