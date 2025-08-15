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

  const onSubmit = (data: RegisterSchema) => {
    console.log(data)
    // Handle form submission logic here
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
                  <FormLabel className='text-white'>User Name</FormLabel>
                  <FormControl>
                    <Input
                      className='text-white placeholder:text-white/50'
                      placeholder='Enter your Username...'
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
                      placeholder='Enter your Email...'
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
                  <FormLabel className='text-white'>Passwords</FormLabel>
                  <FormControl>
                    <InputPassword
                      className='text-white placeholder:text-white/50'
                      placeholder='Enter your Password...'
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
                  <FormLabel className='text-white'>Re-Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      className='text-white placeholder:text-white/50'
                      placeholder='Enter your Password again...'
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
        >
          Register
        </Button>
        {/* <Button variant='outline' className='w-full'>
          Login with Google
        </Button> */}
      </CardFooter>
    </>
  )
}
