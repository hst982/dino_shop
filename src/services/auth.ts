import { LoginSchema, RegisterSchema } from "@/schema/user"

export async function Login(data: LoginSchema) {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: data.email.toLowerCase(),
            password: data.password.trim()
        }),
    })

    if (!res.ok) {
        const error = await res.json()
        throw error
    }

    return res.json()
}

export async function Register(data: RegisterSchema) {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: data.name.trim(),
            email: data.email.toLowerCase(),
            password: data.password.trim()
        }),
    })
    if (!res.ok) {
        const error = await res.json()
        throw error
    }
    return res.json()
}