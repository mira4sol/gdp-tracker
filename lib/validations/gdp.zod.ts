import { z } from 'zod'

export const timeframeSchema = z.enum(['all', 'year', 'month', 'week'])

export const gdpQuerySchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().default(10),
})

export const gdpParamsSchema = z.object({
  id: z.string().min(1, 'GDP ID is required'),
})

export const createGdpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  guild: z.string().min(1, 'Guild is required'),
  chapter: z.string().min(1, 'Chapter is required'),
  amount: z.string().min(1, 'Amount is required'),
  description: z.string().optional(),
})

export const updateGdpSchema = createGdpSchema.partial()
