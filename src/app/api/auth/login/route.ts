import { API_MESSAGES } from "@/lib/constants"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

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

        // Xóa mật khẩu trước khi trả về thông tin người dùng
        const { password: _, ...userWithoutPassword } = user
        return NextResponse.json({
            message: 'Đăng nhập thành công',
            success: true,
            data: userWithoutPassword
        }, { status: 200 })
        
    }catch (error) {
        return NextResponse.json({ message: API_MESSAGES.REGISTRATION.SERVER_ERROR, success: false }, { status: 500 })
    }
}