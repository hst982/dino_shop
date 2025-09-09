'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { api } from '@/lib/axios'
import { RootState } from '@/redux/store'
import { setUser } from '@/redux/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function AvatarHeader() {
  const dispatch = useDispatch()
  useEffect(() => {
    // gọi auth/me để lấy thông tin user
    const fetchUser = async () => {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) return
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      const meRes = await api.get('/auth/me')
      const user = meRes.data

      // lưu thông tin user vào redux
      dispatch(setUser(user))
    }
    fetchUser()
  }, [dispatch])
  const user = useSelector((state: RootState) => state.users)
  return (
    <div className='flex items-center gap-2'>
      <Avatar className='h-9 w-9'>
        <AvatarImage src={user?.avatar || ''} alt='avatar' />
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <h1 className='text-sm lowercase'>{user?.name}</h1>
      <button onClick={() => {}}>Đăng xuất</button>
    </div>
  )
}
