'use client'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterSchema } from '@/schema/user'
import InputPassword from '@/components/ui/inputPassword'
import { useState } from 'react'
import envConfig from '@/config'

export default function FormContent() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      rePassword: '',
    },
    mode: 'all',
  })
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(data: RegisterSchema) {
    const result = await fetch(
      `${envConfig.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
    const resData = await result.json()
  }

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            id='formRegister'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Tên</FormLabel>
                  <FormControl>
                    <Input
                      className='text-white placeholder:text-white/50'
                      placeholder='Nhập tên của bạn...'
                      {...field}
                      type='text'
                    />
                  </FormControl>
                  <FormMessage className='text-[0.8rem] italic' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Email</FormLabel>
                  <FormControl>
                    <Input
                      className='text-white placeholder:text-white/50'
                      placeholder='Nhập email của bạn...'
                      {...field}
                      type='email'
                    />
                  </FormControl>
                  <FormMessage className='text-[0.8rem] italic' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Mật khẩu</FormLabel>
                  <FormControl>
                    <InputPassword
                      className='text-white placeholder:text-white/50'
                      placeholder='Nhập mật khẩu của bạn...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-[0.8rem] italic' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='rePassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>
                    Xác nhận mật khẩu
                  </FormLabel>
                  <FormControl>
                    <InputPassword
                      className='text-white placeholder:text-white/50'
                      placeholder='Nhập lại mật khẩu của bạn...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-[0.8rem] italic' />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex-col gap-2'>
        <Button
          type='submit'
          className='w-full cursor-pointer'
          form='formRegister'
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </Button>
      </CardFooter>
    </>
  )
}
