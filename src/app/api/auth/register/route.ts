import { API_MESSAGES, EMAIL_VERIFICATION_EXPIRES_MS, PASSWORD_SALT_ROUNDS } from "@/lib/constants"
import { NextResponse } from "next/server"
import { prisma} from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendVerificationEmail } from "@/lib/email"

export async function POST(req: Request) {
    try {
        // Lấy dữ liệu từ request body
        const { name, email, password} = await req.json()
        if (!name || !email || !password) {
            return NextResponse.json({
                type: 'field-errors',
                message: API_MESSAGES.REGISTRATION.MISSING_FIELDS,
                errors: {
                    name: API_MESSAGES.REGISTRATION.NAME_REQUIRED,
                    email: API_MESSAGES.REGISTRATION.EMAIL_REQUIRED,
                    password: API_MESSAGES.REGISTRATION.PASSWORD_REQUIRED
                }
            }, { status: 400 })
        }
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ 
                type: 'field-errors',
                message: API_MESSAGES.REGISTRATION.USER_EXISTS_EMAIL,
                errors: {
                    email: API_MESSAGES.REGISTRATION.USER_EXISTS_EMAIL
                },
            }, 
            { status: 400 });
        }

        // hash mật khẩu
        const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS)

        // tạo token xác thực email
        const token = crypto.randomBytes(32).toString('hex')
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
        const verificationExpires = new Date(Date.now() + EMAIL_VERIFICATION_EXPIRES_MS)

        // Tạo người dùng mới
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                emailVerificationToken: hashedToken,
                emailVerificationExpires: verificationExpires
            }
        })

        // Gửi email xác thực
        sendVerificationEmail(email, token).catch(error => {
            console.warn('Lỗi không thể gửi email xác thực:', error)
        })

        return NextResponse.json({ message: API_MESSAGES.REGISTRATION.SUCCESS }, { status: 201 });

    }catch (error) {
        return NextResponse.json({message: API_MESSAGES.REGISTRATION.SERVER_ERROR , success: false }, { status: 500 })
    }
}