import { z } from 'zod'

export const bountyFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  guild: z.string().min(1, 'Guild is required'),
  chapter: z.string().min(1, 'Chapter is required'),
  amount: z.number().min(1, 'Amount is required'),
  description: z.string().min(1, 'Description is required'),
})
