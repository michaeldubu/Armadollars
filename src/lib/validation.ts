import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const awardSchema = z.object({
  employeeId: z.string(),
  amount: z.number().positive(),
  reason: z.string().min(1).max(500),
})

export function validateInput<T>(schema: z.ZodType<T>, data: unknown): T {
  return schema.parse(data)
}
