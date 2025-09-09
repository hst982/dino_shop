import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
export async function POST() {
  try {
    // lấy refresh Token từ cookie
    const cookieStore = await cookies()
    const refreshToken = (await cookieStore).get('refreshToken')?.value

    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: {
          token: refreshToken,
        },
      })
    }

    // Xóa cookie refreshToken
    const res = NextResponse.json({ message: 'Đăng xuất thành công' })
    cookieStore.set('refreshToken', '', { maxAge: 0, path: '/' })

    return res
  } catch (err) {
    console.error(err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
