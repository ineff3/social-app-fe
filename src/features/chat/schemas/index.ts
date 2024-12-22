import { z } from 'zod'

// Login
export const messageValidationSchema = z.object({
  text: z.string().max(1000, 'Cant exceed more than 1000 symbols'),
})
export type MessageForm = z.infer<typeof messageValidationSchema>
