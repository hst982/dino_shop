'use Client'

import { api } from '@/lib/axios'
import { RootState } from '@/redux/store'
import { clearUser, setUser } from '@/redux/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function useAuth() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.users)

  // lấy user từ auth me
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

  // đăng xuất
  const handleLogout = async () => {
    await api.post('/auth/logout')
    localStorage.removeItem('accessToken')
    dispatch(clearUser())
  }

  return { user, handleLogout }
}
