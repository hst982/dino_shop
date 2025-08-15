'use client'
import React, { useEffect, useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { SidebarGroupCustom } from './SidebarGroupCustom'
import { menuData } from './menu-data'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import SidebarHeaderCustom from '@/components/ui/sidebar/SidebarHeadeCustom'
import SidebarFooterCustom from '@/components/ui/sidebar/SidebarFooterCustom'

export default function SidebarWrap({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const collapsible = isMobile ? 'offcanvas' : 'icon'
  const variant = isMobile ? 'floating' : 'sidebar'

  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (isDesktop) setOpen(true) // desktop: mở to
    else if (isTablet) setOpen(false) // tablet: icon-only
    else if (isMobile) setOpen(false) // mobile: ẩn, offcanvas
  }, [isMobile, isTablet, isDesktop])

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar
        collapsible={collapsible}
        variant={variant}
        onClick={() => setOpen(true)}
      >
        <SidebarHeaderCustom />

        <SidebarContent>
          {menuData.map((group, i) => (
            <SidebarGroupCustom key={i} {...group} />
          ))}
        </SidebarContent>

        <SidebarFooterCustom />
      </Sidebar>
      {children}
    </SidebarProvider>
  )
}
