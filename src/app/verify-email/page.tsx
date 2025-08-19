'use client'
import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import VerifyEmailContent from '@/app/verify-email/verify-email-content'

export default function VerifyEmailPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle>Xác thực Email</CardTitle>
        </CardHeader>
        <CardContent className='text-center'>
          <Suspense
            fallback={
              <div className='flex flex-col items-center gap-4'>
                <Loader2 className='h-12 w-12 animate-spin text-blue-500' />
                <p className='text-lg'>Đang tải...</p>
              </div>
            }
          >
            <VerifyEmailContent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
