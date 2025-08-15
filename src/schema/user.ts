import {z} from 'zod'
import { VALIDATION_MESSAGES } from '@/lib/constants'

export const registerSchema = z.object({
    username: z.string().min(1, {message: VALIDATION_MESSAGES.USERNAME.REQUIRED}),
    email: z.string().email({message: VALIDATION_MESSAGES.EMAIL.INVALID}),
    password: z.string()
        .min(8, { message: VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH })
        .regex(/[A-Z]/, { message: VALIDATION_MESSAGES.PASSWORD.UPPERCASE })
        .regex(/[a-z]/, { message: VALIDATION_MESSAGES.PASSWORD.LOWERCASE })
        .regex(/[0-9]/, { message: VALIDATION_MESSAGES.PASSWORD.NUMBER })
        .regex(/[^A-Za-z0-9]/, { message: VALIDATION_MESSAGES.PASSWORD.SPECIAL })
        .refine((val) => !/[À-ỹà-ỹ]/.test(val), { message: VALIDATION_MESSAGES.PASSWORD.NO_ACCENTS }),
    rePassword: z.string().min(1, {message: VALIDATION_MESSAGES.RE_PASSWORD.REQUIRED
    }),
    }).refine((data) => data.password === data.rePassword, {
        message: VALIDATION_MESSAGES.RE_PASSWORD.MISMATCH,
        path: ['rePassword'],
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email: z.string().email({message: VALIDATION_MESSAGES.EMAIL.INVALID}),
    password: z.string().min(1, { message: VALIDATION_MESSAGES.PASSWORD.REQUIRED }),
})

export type LoginSchema = z.infer<typeof loginSchema>