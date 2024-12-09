import { z } from 'zod'

export const editProfileValidationSchema = z.object({
  userImage: z.any(),
  backgroundImage: z.any(),
  firstName: z.string(),
  secondName: z.string(),
  bio: z.string(),
  location: z.string(),
  link: z.union([z.literal(''), z.string().url({ message: 'Invalid url' })]),
})

export type EditProfileFormType = z.infer<typeof editProfileValidationSchema>
