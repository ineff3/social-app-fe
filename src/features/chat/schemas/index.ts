import { z } from 'zod'

export const messageValidationSchema = z
  .object({
    messageImages: z.any(),
    text: z.string(),
  })
  .refine((data) => data.text || data.messageImages?.length > 0)
