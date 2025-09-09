'use client'
import { SidebarFooter } from '@/components/ui/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { setUser } from '@/redux/userSlice'

export default function SidebarFooterCustom() {
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
    <SidebarFooter>
      <h1>footer</h1>
      <h2>{user ? user.name : ''}</h2>
    </SidebarFooter>
  )
}
