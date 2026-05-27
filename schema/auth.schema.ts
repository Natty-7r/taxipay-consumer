import { z } from 'zod';

export const loginSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number too long'),
  pin: z.string().min(4, 'PIN must be at least 4 digits').max(6, 'PIN too long'),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name required').max(50),
  lastName: z.string().min(2, 'Last name required').max(50),
  phoneNumber: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required').optional(),
  pin: z.string().min(4, 'PIN must be 4-6 digits').max(6),
  confirmPin: z.string(),
}).refine((data) => data.pin === data.confirmPin, {
  message: "PINs don't match",
  path: ['confirmPin'],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;