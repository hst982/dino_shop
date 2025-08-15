'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut, useSession } from 'next-auth/react'

export default function AvatarHeader() {
  const { data: session } = useSession()

  return (
    <div className='flex items-center gap-2'>
      <Avatar className='h-9 w-9'>
        <AvatarImage src={session?.user?.image || ''} alt='avatar' />
        <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <h1 className='text-sm lowercase'>{session?.user?.name}</h1>
      <button onClick={() => signOut({ callbackUrl: '/login' })}>
        Đăng xuất
      </button>
    </div>
  )
}
