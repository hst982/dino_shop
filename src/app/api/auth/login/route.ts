import { API_MESSAGES } from "@/lib/constants"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password} = body

        // Kiểm tra các trường bắt buộc
        if (!email || !password) {
            return NextResponse.json({
                type: 'field-errors',
                message: API_MESSAGES.REGISTRATION.MISSING_FIELDS,
                errors: {
                    email: API_MESSAGES.REGISTRATION.EMAIL_REQUIRED,
                    password: API_MESSAGES.REGISTRATION.PASSWORD_REQUIRED
                }
            }, { status: 400 })
        }
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase()
            }
        })
        // Nếu không tìm thấy người dùng, trả về lỗi
        if (!user?.email || !user?.password) {
            return NextResponse.json({
                type: 'field-errors',
                message: 'Tài khoản không tồn tại',
                errors: {
                    email: "Email sai hoặc không tồn tại",
                }
            }, { status: 400 })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({
                type: 'field-errors',
                message: 'Mật khẩu không chính xác',
                errors: {
                    password: 'Mật khẩu không chính xác'
                }
            }, { status: 400 })
        }

        // Tạo access token
        if (!process.env.JWT_ACCESS_SECRET) {
            throw new Error("JWT_ACCESS_SECRET không được định nghĩa")
        }
        const accessToken = jwt.sign({
            id: user.id,
            role: user.role
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })

        // Tạo refresh token
        if(!process.env.JWT_REFRESH_SECRET){
            throw new Error("JWT_REFRESH_SECRET không được định nghĩa")
        }

        const refreshToken = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d'})

        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7*24*60*60*1000) // 7 days
            }
        })

        const response = NextResponse.json({
            message: 'Đăng nhập thành công',
            success: true,
            data: {
                accessToken,
                // user: {
                //     id: user.id,
                //     email: user.email,
                //     role: user.role,
                // }
            }
        }, { status: 200 });

        // Set refresh token cookie
        response.cookies.set(
            "refreshToken",
            refreshToken,
            {
                httpOnly: true,
                sameSite: 'strict',
                path: '/'
            }
        );

        return response;
        
    }catch (error) {
        return NextResponse.json({ message: API_MESSAGES.REGISTRATION.SERVER_ERROR || error, success: false }, { status: 500 })
    }
}