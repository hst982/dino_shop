'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ButtonToggleTheme() {
  const { setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    if (!mounted) return // đảm bảo chỉ chạy khi đã render phía client

    const current = localStorage.getItem('theme')
    if (current === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }
  if (!mounted) return null // tránh flash UI khi SSR

  return (
    <Button
      variant='outline'
      size='icon'
      className='cursor-pointer rounded-full'
      onClick={handleToggle}
    >
      <Sun className='h-[1rem] w-[1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      <Moon className='absolute h-[1rem] w-[1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
    </Button>
  )
}
