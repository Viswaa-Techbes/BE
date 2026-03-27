const express = require('express');
const router = express.Router();

const promotionController = require('../controllers/promotion.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createPromotionSchema, codeParamSchema, paginationSchema } = require('../validation/promotion.validation');

router.get('/active', validate(paginationSchema), promotionController.getActivePromotions);
router.post('/', authenticate, authorize('admin'), validate(createPromotionSchema), promotionController.createPromotion);
router.get('/:code', validate(codeParamSchema), promotionController.getPromotionByCode);

module.exports = router;