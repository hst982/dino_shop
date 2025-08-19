import { NextResponse } from "next/server"
import crypto from 'crypto'
import { prisma } from "@/lib/prisma"

export async function POST(rq: Request) {
    try {
        const { token} = await rq.json()

        if (!token) {
        return NextResponse.json(
            { message: 'Token không hợp lệ' },
            { status: 400 }
        )
        }
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

        // Tìm user với token này
        const user = await prisma.user.findUnique({
            where: {
                emailVerificationToken: hashedToken
            }
        })

        // Kiểm tra xem user có tồn tại không
        if (!user) {
            return NextResponse.json(
                { message: 'Toke không hợp lệ hoặc đã hết hạn'}, 
                { status: 400 }
            )
        }

        // Kiểm tra token có hết hạn không
        if (user.emailVerificationExpires && user.emailVerificationExpires < new Date()){
            return NextResponse.json (
                {message: 'Token đã hết hạn'},
                { status: 400 }
            )
        }

        // Cập nhật user thành đã xác thực
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                emailVerified: true,
                emailVerificationExpires: null,
                emailVerificationToken: null
            }
        })

        return NextResponse.json(
            { message: 'Email đã được xác thực thành công!' },
            { status: 200 }
        )

    }catch (error) {
        return NextResponse.json({ message: error, success: false }, { status: 500 })
    }
}