import { Metadata } from 'next'
import React from 'react'

import SidebarWrap from '@/components/ui/sidebar/SidebarWrap'
import { SidebarInset } from '@/components/ui/sidebar'
import Header from '@/components/admin/Header'

export const metadata: Metadata = {
  title: 'DinoShop | Admin',
  description: 'make by DinoShop',
}
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='app'>
      <SidebarWrap>
        <SidebarInset>
          <div className='p-4 min-h-screen'>
            <Header />
            {children}
          </div>
        </SidebarInset>
      </SidebarWrap>
    </div>
  )
}
