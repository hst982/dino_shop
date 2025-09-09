'use client'
import { SidebarFooter } from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function SidebarFooterCustom() {
  const { user, handleLogout } = useAuth()
  const router = useRouter()

  const handleLogoutAndRedirect = async () => {
    await handleLogout()
    router.push('/login')
  }

  return (
    <SidebarFooter>
      <h1>footer</h1>
      <h2>{user ? user.name : ''}</h2>
      <button onClick={handleLogoutAndRedirect}>Đăng xuất</button>
    </SidebarFooter>
  )
}
