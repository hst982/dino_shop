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
import { loginSchema, LoginSchema } from '@/schema/user'
import InputPassword from '@/components/ui/inputPassword'
import { useState } from 'react'
import { Login } from '@/services/auth'
import { toast } from 'sonner'
import { API_MESSAGES } from '@/lib/constants'
import { useRouter } from 'next/navigation'

type FieldError = {
  type: 'field-errors'
  errors: Record<string, string>
  message: string
}

export default function FormContent() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true)
    form.clearErrors()

    try {
      const user = await Login(data)
      toast.success('Chào mừng trở lại')
      setIsLoading(false)
      // Redirect or perform any other action after successful login

      if (
        ['SUPERADMIN', 'ADMIN', 'STAFF', 'MANAGER'].includes(user.data.role)
      ) {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } catch (error: unknown) {
      setIsLoading(false)
      if (
        error &&
        typeof error === 'object' &&
        'type' in error &&
        error.type === 'field-errors'
      ) {
        const fieldError = error as FieldError
        // Set form errors based on the response
        Object.entries(fieldError.errors).forEach(([field, message]) => {
          form.setError(field as keyof LoginSchema, { message })
        })
        toast.error(fieldError.message)
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : API_MESSAGES.REGISTRATION.SERVER_ERROR,
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            id='formLogin'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Email</FormLabel>
                  <FormControl>
                    <Input
                      className='text-white placeholder:text-white/50'
                      placeholder='Nhập email...'
                      lang='en'
                      {...field}
                      type='email'
                      disabled={isLoading}
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
                      placeholder='Nhập mật khẩu...'
                      lang='en'
                      {...field}
                      disabled={isLoading}
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
          form='formLogin'
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </CardFooter>
    </>
  )
}
