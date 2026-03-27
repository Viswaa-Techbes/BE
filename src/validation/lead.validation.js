const { z } = require('zod');

const createLeadSchema = z.object({ body: z.object({ name: z.string().min(2), email: z.string().email(), phone: z.string().min(7), source: z.string().optional(), status: z.enum(['new', 'contacted', 'qualified', 'lost']).optional(), }), });

const paginationSchema = require('./user.validation').paginationSchema;

module.exports = { createLeadSchema, paginationSchema };
