import FormContent from '@/app/(auth)/login/FormContent'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function LoginPage() {
  return (
    <div className='registerPage'>
      <Card className='w-full max-w-sm border border-white/30 bg-white/10 backdrop-blur-lg p-6 overflow-hidden'>
        <CardHeader className='p-0'>
          <CardTitle className='text-white'>Login</CardTitle>
          <CardDescription className='text-white/50'>
            Sign in for a shopping experience with DinoShop
          </CardDescription>
          <CardAction>
            <Button variant='link' asChild>
              <Link href='/register' className='text-white hover:text-white/80'>
                <span>Sign Up</span>
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <FormContent />
      </Card>
    </div>
  )
}
