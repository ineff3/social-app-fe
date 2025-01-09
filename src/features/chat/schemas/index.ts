import { z } from 'zod'

// Login
export const messageValidationSchema = z.object({
  text: z.string().min(1),
})
export type MessageForm = z.infer<typeof messageValidationSchema>
