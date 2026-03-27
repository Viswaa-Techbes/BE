const { z } = require('zod');

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['admin', 'technician', 'customer']).optional(),
  }),
});

const forgotPasswordSchema = z.object({ body: z.object({ email: z.string().email() }) });

const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().uuid().or(z.string().min(20)),
    newPassword: z.string().min(6),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
  }),
});

module.exports = { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema, changePasswordSchema };
