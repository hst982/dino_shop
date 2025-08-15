import React from 'react'
import Link from 'next/link'
import { SidebarHeader } from '@/components/ui/sidebar'

export default function SidebarHeaderCustom() {
  return (
    <SidebarHeader>
      <Link href='/admin'>
        <h1 className='text-xl font-bold font-heading bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent'>
          Dino Shop | Admin
        </h1>
      </Link>
    </SidebarHeader>
  )
}
