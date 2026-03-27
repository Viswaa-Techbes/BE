const { z } = require('zod');

const idRegex = /^[0-9a-fA-F]{24}$/;

const createJobSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    description: z.string().optional(),
    technicianId: z.string().regex(idRegex).optional(),
    status: z.enum(['pending', 'in-progress', 'completed', 'cancelled']).optional(),
    scheduledDate: z.string().datetime().optional(),
  }),
});

const updateJobSchema = z.object({
  params: z.object({ id: z.string().regex(idRegex) }),
  body: z.object({
    title: z.string().min(2).optional(),
    description: z.string().optional(),
    technicianId: z.string().regex(idRegex).optional(),
    status: z.enum(['pending', 'in-progress', 'completed', 'cancelled']).optional(),
    scheduledDate: z.string().datetime().optional(),
  }).partial(),
});

const jobIdParamSchema = z.object({ params: z.object({ id: z.string().regex(idRegex) }) });

const statusSchema = z.object({
  params: z.object({ id: z.string().regex(idRegex) }),
  body: z.object({ status: z.enum(['pending', 'in-progress', 'completed', 'cancelled']) }),
});

const paginationSchema = require('./user.validation').paginationSchema;

module.exports = { createJobSchema, updateJobSchema, jobIdParamSchema, statusSchema, paginationSchema };
