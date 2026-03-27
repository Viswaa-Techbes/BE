const { z } = require('zod');

const statusSchema = z.object({
  params: z.object({ id: z.string().regex(/^[0-9a-fA-F]{24}$/) }),
  body: z.object({ status: z.enum(['active', 'inactive']) }),
});

module.exports = { statusSchema };
