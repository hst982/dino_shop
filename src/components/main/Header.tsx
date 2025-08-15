import React from 'react'
import AvatarHeader from '@/components/common/AvatarHeader'
import ButtonToggleTheme from '@/contexts/ButtonToggleTheme'
import CartButton from '@/components/common/CartButton'

export default function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md dark:border-b'>
      <div className='container mx-auto px-4 py-5'>
        <div className='flex items-center justify-between'>
          <div className='box-logo'>
            <h1 className='text-3xl font-bold font-heading -tracking-tight bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent'>
              Dino Shop
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            <CartButton />
            <ButtonToggleTheme />
            {/* <AvatarHeader /> */}
          </div>
        </div>
      </div>
    </header>
  )
}
