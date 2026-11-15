import { z } from 'zod';

const email = z.email({ error: 'Please enter a valid email address' });

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: 'Name must be at least 2 characters' })
    .max(64, { error: 'Name cannot be longer than 64 characters' }),
  email,
  message: z
    .string()
    .trim()
    .min(1, { error: 'Please write a message' })
    .max(2250, { error: 'Message cannot exceed 2250 characters' }),
});

export const subscribeSchema = z.object({ email });

export type ContactValues = z.infer<typeof contactSchema>;
export type SubscribeValues = z.infer<typeof subscribeSchema>;
