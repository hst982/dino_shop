'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/useAuth'

export default function AvatarHeader() {
  const { user, handleLogout } = useAuth()
  // const user = dataUser.user

  return (
    <div className='flex items-center gap-2'>
      <Avatar className='h-9 w-9'>
        <AvatarImage src={user?.avatar || ''} alt='avatar' />
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <h1 className='text-sm lowercase'>{user.name}</h1>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  )
}
