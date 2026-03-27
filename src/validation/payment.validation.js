const { z } = require('zod');

const idRegex = /^[0-9a-fA-F]{24}$/;

const createPaymentSchema = z.object({
  body: z.object({
    jobId: z.string().regex(idRegex),
    amount: z.number().positive(),
    status: z.enum(['pending', 'paid', 'failed', 'refunded']).optional(),
    paymentMethod: z.enum(['card', 'cash', 'wallet', 'bank-transfer']).optional(),
  }),
});

const idParamSchema = z.object({ params: z.object({ id: z.string().regex(idRegex) }) });

const paginationSchema = require('./user.validation').paginationSchema;

module.exports = { createPaymentSchema, idParamSchema, paginationSchema };
