// components/ui/sidebar/SidebarGroupCustom.tsx
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar'
import { SidebarItem } from './SidebarItem'

type SubItem = {
  title: string
  href: string
}
interface SidebarItemProps {
  title: string
  href?: string | undefined
  icon: React.ComponentType<React.SVGProps<SVGElement>>
  children?: SubItem[]
}

type SidebarGroupCustomProps = {
  group: React.ReactNode
  items: SidebarItemProps[]
}

export function SidebarGroupCustom({ group, items }: SidebarGroupCustomProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{group}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, i) => (
            <SidebarItem key={i} {...item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
