import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string().optional(),
  stockAvailable: z.number().int().nonnegative(),
  isAvailable: z.boolean().default(true), 
  category: z.enum(['SEX_SHOP', 'FOOD', 'GAMES', 'BIRD', 'NON']),
  tags: z.array(z.string()),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;