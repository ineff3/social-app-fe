import { z } from 'zod'

export const editProfileValidationSchema = z.object({
  profileImage: z.any(),
  backgroundImage: z.any(),
  firstName: z
    .string()
    .min(2, 'At least two characters')
    .regex(/^[A-Za-z]+$/, 'Only alphabetic characters'),
  secondName: z
    .string()
    .min(2, 'At least two characters')
    .regex(/^[A-Za-z]+$/, 'Only alphabetic characters'),
  bio: z.string(),
  location: z.string(),
  link: z.union([z.literal(''), z.string().url({ message: 'Invalid url' })]),
})

type EditProfileValidationType = z.infer<typeof editProfileValidationSchema>

export interface EditProfilePicture {
  file: File
  imageKey?: string
}
export interface EditProfileFormType extends EditProfileValidationType {
  profileImage: EditProfilePicture | null
  backgroundImage: EditProfilePicture | null
}
