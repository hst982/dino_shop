import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    // const body = await req.json()
    // const { refreshToken } = body

    const cookieStore = cookies()
    const refreshToken = (await cookieStore).get('refreshToken')?.value

    if (!refreshToken) {
      return NextResponse.json(
        {
          message: 'Không có refresh token',
        },
        { status: 401 },
      )
    }

    // check token trong DB
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    })

    if (!storedToken) {
      return NextResponse.json(
        {
          message: 'Refresh token không hợp lệ',
        },
        { status: 403 },
      )
    }

    if (storedToken.expiresAt < new Date()) {
      return NextResponse.json(
        { message: 'Refresh token đã hết hạn' },
        { status: 403 },
      )
    }

    // tạo access token mới
    if (!process.env.JWT_ACCESS_SECRET) {
      throw new Error('JWT_ACCESS_SECRET không được định nghĩa')
    }

    const newAccessToken = jwt.sign(
      { id: storedToken.user.id, role: storedToken.user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' },
    )

    return NextResponse.json(
      {
        message: 'Refresh token thành công',
        accessToken: newAccessToken,
      },
      { status: 200 },
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { message: 'lỗi server', error: err },
      { status: 500 },
    )
  }
}
