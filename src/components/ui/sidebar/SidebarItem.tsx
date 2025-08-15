import {
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@radix-ui/react-collapsible'
import { ChevronRight } from 'lucide-react'

type SubItem = {
  title: string
  href: string
}

type SidebarItemProps = {
  title: string
  href: string
  icon?: React.ComponentType<React.SVGProps<SVGElement>>
  children?: SubItem[]
}

export function SidebarItem({
  title,
  href,
  icon: Icon,
  children,
}: SidebarItemProps) {
  const { open } = useSidebar()
  const pathName = usePathname()

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        {children ? (
          <Collapsible className='group/collapsible'>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className='group'>
                  {Icon && <Icon className='w-4 h-4' />}
                  <span>{title}</span>
                  <ChevronRight className='w-4 h-4 ml-auto transition-transform duration-300 group-data-[state=open]:rotate-90' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {children.map((item, key) => (
                    <SidebarMenuSubItem key={key}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathName === item.href}
                        className='data-[active=true]:bg-blue-500 data-[active=true]:text-white'
                      >
                        <Link
                          href={item.href}
                          className='flex items-center gap-2'
                        >
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ) : (
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathName === href}
              className='data-[active=true]:bg-blue-500 data-[active=true]:text-white'
            >
              <Link href={href} className='flex items-center gap-2'>
                {Icon && <Icon className='w-4 h-4' />}
                <span>{title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </TooltipTrigger>
      {!open && (
        <TooltipContent side='right'>
          <p>{title}</p>
        </TooltipContent>
      )}
    </Tooltip>
  )
}
