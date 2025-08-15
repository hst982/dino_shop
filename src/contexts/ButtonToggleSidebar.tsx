'use client'
import { useSidebar } from '@/components/ui/sidebar'
import { PanelLeft } from 'lucide-react'
import React from 'react'

export default function ButtonToggleSidebar() {
  const { open, setOpen } = useSidebar()
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className='rounded-lg hover:bg-gray-200 p-1.5'
      >
        <PanelLeft className='w-[1.3rem] h-[1.3rem]' />
      </button>
    </div>
  )
}
