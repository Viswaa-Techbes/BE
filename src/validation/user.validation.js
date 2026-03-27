const { z } = require('zod');

const userIdParamSchema = z.object({ params: z.object({ id: z.string().regex(/^[0-9a-fA-F]{24}$/) }) });

const userUpdateSchema = z.object({
  params: z.object({ id: z.string().regex(/^[0-9a-fA-F]{24}$/) }),
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    role: z.enum(['admin', 'technician', 'customer']).optional(),
    status: z.enum(['active', 'inactive', 'suspended']).optional(),
  }).partial(),
});

const paginationSchema = z.object({
  query: z.object({ page: z.preprocess((v) => Number(v), z.number().int().positive().default(1)), limit: z.preprocess((v) => Number(v), z.number().int().positive().max(100).default(20)), }),
});

module.exports = { userIdParamSchema, userUpdateSchema, paginationSchema };
