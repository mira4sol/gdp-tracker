import { bountyFormSchema } from '@/lib/validations/forms.zod'

export type ZodBountyFormType = z.infer<typeof bountyFormSchema>
