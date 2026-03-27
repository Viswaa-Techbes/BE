const { z } = require('zod');

const codeParamSchema = z.object({ params: z.object({ code: z.string().min(1) }) });

const createPromotionSchema = z.object({ body: z.object({ code: z.string().min(2), discount: z.number().positive(), expiry: z.string().datetime(), active: z.boolean().optional(), }), });

const paginationSchema = require('./user.validation').paginationSchema;

module.exports = { createPromotionSchema, codeParamSchema, paginationSchema };
