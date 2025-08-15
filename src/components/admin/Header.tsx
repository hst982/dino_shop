import ButtonToggleSidebar from '@/contexts/ButtonToggleSidebar'
import ButtonToggleTheme from '@/contexts/ButtonToggleTheme'
import React from 'react'

export default function Header() {
  return (
    <header className='header flex items-center justify-between gap-1.5 mb-5'>
      <ButtonToggleSidebar />

      <ButtonToggleTheme />
    </header>
  )
}
