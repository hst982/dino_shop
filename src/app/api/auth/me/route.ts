import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer')) {
      return NextResponse.json({ message: 'Không có token' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return NextResponse.json({ message: 'Không có token' }, { status: 401 })
    }

    let payload: { id: string }
    try {
      payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { id: string }
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return NextResponse.json({ message: 'Token đã hết hạn' }, { status: 401 })
      }
      return NextResponse.json({ message: 'Token không hợp lệ' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    })

    if (!user) {
      return NextResponse.json({ message: 'Người dùng không tồn tại' }, { status: 404 })
    }

    const { password, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)

  } catch (error) {
    console.error('Error in /auth/me:', error)
    return NextResponse.json({ message: 'Lỗi máy chủ' }, { status: 500 })
  }
}
