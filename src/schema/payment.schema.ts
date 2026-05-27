import { z } from 'zod';

export const paymentSchema = z.object({
  routeId: z.string().min(1, 'Route selection required'),
  provider: z.enum(['TELEBIRR', 'MPESA', 'CBE']),
  amount: z.number().positive('Amount must be positive'),
  taxiId: z.string().min(1),
});

export const nidVerificationSchema = z.object({
  nidNumber: z.string().min(8, 'Valid NID required').max(15),
  fullName: z.string().min(3, 'Full name required'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
export type NIDVerificationInput = z.infer<typeof nidVerificationSchema>;