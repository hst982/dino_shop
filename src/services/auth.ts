import { LoginSchema, RegisterSchema } from "@/schema/user"
import { api} from '@/lib/axios'

type ApiError = {
    type: 'field-errors'
    message: string
    errors?: Record<string, string>
}

let registerController: AbortController | null = null
let loginController: AbortController | null = null

export async function Login(data: LoginSchema) {
    if(loginController) loginController.abort()
        loginController = new AbortController()
    try {
        const res = await api.post('/auth/login', {
            email: data.email.toLowerCase(),
            password: data.password.trim()
        },{signal: loginController.signal})
        return res.data
    }catch(error: unknown){
        const err = error as {response?: {data?: ApiError}}
        if(err.response?.data) throw err.response.data
        throw { message: 'Lỗi Server'}
    }
}

export async function Register(data: RegisterSchema) {
    if(registerController) registerController.abort()
        registerController = new AbortController()
    try {
        const res = await api.post('/auth/register', {
            name: data.name.trim(),
            email: data.email.toLowerCase(),
            password: data.password.trim()
        },{signal: registerController.signal})
        return res.data
    }catch(error: unknown){
        const err = error as {response?: {data?: ApiError}}
        if(err.response?.data) throw err.response.data
        throw { message: 'Lỗi Server'}
    }
}