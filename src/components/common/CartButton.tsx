'use client'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

export default function CartButton() {
  return (
    <Button variant='outline' size='icon' className='cursor-pointer'>
      <ShoppingCart className='w-4 h-4' />
    </Button>
  )
}
