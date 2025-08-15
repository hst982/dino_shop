'use client'
import { Input } from '@/components/ui/input'
import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'

export default function InputPassword({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  const [show, setShow] = useState(false)

  return (
    <div className='relative'>
      <Input
        type={show ? 'text' : 'password'}
        data-slot='input'
        className={className}
        {...props}
      />
      <button
        type='button'
        className='absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500'
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? (
          <Eye className='w-4 h-4 text-white' />
        ) : (
          <EyeClosed className='w-4 h-4 text-white' />
        )}
      </button>
    </div>
  )
}
