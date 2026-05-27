import { z } from 'zod';

export const transactionFilterSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  provider: z.enum(['TELEBIRR', 'MPESA', 'CBE']).optional(),
  status: z.enum(['SUCCESS', 'FAILED', 'PENDING']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(500, 'Comment too long').optional(),
  tags: z.array(z.string()).max(5).optional(),
});

export type TransactionFilterInput = z.infer<typeof transactionFilterSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;