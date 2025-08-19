'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  )
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Token xác thực không hợp lệ')
      return
    }

    verifyEmail(token)
  }, [token])

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
      } else {
        setStatus('error')
        setMessage(data.message)
      }
    } catch {
      setStatus('error')
      setMessage('Có lỗi xảy ra, vui lòng thử lại sau')
    }
  }

  switch (status) {
    case 'loading':
      return (
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='h-12 w-12 animate-spin text-blue-500' />
          <p className='text-lg'>Đang xác thực email...</p>
        </div>
      )
    case 'success':
      return (
        <div className='flex flex-col items-center gap-4'>
          <CheckCircle className='h-12 w-12 text-green-500' />
          <p className='text-lg text-green-600'>{message}</p>
          <Button asChild>
            <a href='/login'>Đăng nhập ngay</a>
          </Button>
        </div>
      )
    case 'error':
      return (
        <div className='flex flex-col items-center gap-4'>
          <XCircle className='h-12 w-12 text-red-500' />
          <p className='text-lg text-red-600'>{message}</p>
          <Button variant='outline' asChild>
            <a href='/register'>Đăng ký lại</a>
          </Button>
        </div>
      )
  }
}
