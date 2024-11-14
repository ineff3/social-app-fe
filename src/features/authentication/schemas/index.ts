import { requiredStringFieldSchema } from '@/src/utils/schemas/schemeTransformations'
import { z } from 'zod'

// Login
export const loginValidationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is a required filed')
    .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email address is not valid')
    .trim(),
  password: z
    .string()
    .min(1, 'Password is a required field')
    .min(6, 'Password must be at least 6 characters')
    .trim(),
  persist: z.boolean().optional(),
})
export type LoginFormType = z.infer<typeof loginValidationSchema>

// Signup
export const signupValidationSchema = z
  .object({
    firstName: requiredStringFieldSchema('First name', 3),
    secondName: requiredStringFieldSchema('Second name', 3),
    email: z
      .string()
      .min(1, 'Email is a required filed')
      .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email address is not valid')
      .trim(),
    password: requiredStringFieldSchema('Password', 6),
    confirmPassword: requiredStringFieldSchema('Confirm password', 6),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  )
export type SignupFormType = z.infer<typeof signupValidationSchema>
