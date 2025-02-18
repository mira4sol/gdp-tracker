'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/contexts/auth.context'
import { gdpRequests } from '@/lib/api_requests/gdp.request'
import { CATEGORIES, GUILDS } from '@/lib/constants/app.constant'
import { zodResolver } from '@hookform/resolvers/zod'
import { Notify } from 'notiflix'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username should not be empty' }),
  description: z
    .string()
    .min(1, { message: 'Description should not be empty' }),
  guild: z.string().min(1, { message: 'Guild should not be empty' }),
  category: z.string().min(1, { message: 'Category should not be empty' }),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'Amount must be a valid number.',
    })
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: 'Amount must be positive.' }),
})

export function AddUserDialog({
  customTrigger,
}: {
  customTrigger?: React.ReactNode
}) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [canAddGDP, setCanAddGDP] = useState(false)
  const { isLoggedIn, user } = useAuth()

  useEffect(() => {
    setCanAddGDP(
      isLoggedIn && (user?.role === 'admin' || user?.role === 'moderator')
    )
  }, [isLoggedIn, user?.role])

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      description: '',
      guild: '',
      category: '',
      amount: 0,
    },
  })

  // Submit Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await gdpRequests.createGDP(
        {
          name: values.username,
          description: values.description,
          guild: values.guild,
          amount: values.amount.toString(),
          chapter: 'default',
          category: values.category,
        },
        setLoading
      )

      if (!response.success) {
        Notify.failure(response.message || 'Failed to create user')
        return
      }

      console.log('Success Data____:', response.data)
      form.reset()
      setOpen(false)
    } catch (error) {
      console.error('Request Error:', error)
      Notify.failure('An error occurred while creating user')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        {canAddGDP && (
          <Button
            variant='outline'
            className='rounded-xl border border-green-800 bg-transparent text-green-800 hover:bg-green-100 focus:outline-none'
          >
            Add New User
          </Button>
        )} */}
      {canAddGDP && (
        <div onClick={() => setOpen(true)}>
          {customTrigger ? (
            customTrigger
          ) : (
            <Button
              variant='outline'
              className='rounded-xl border border-green-800 bg-transparent text-green-800 hover:bg-green-100 focus:outline-none'
            >
              Add New User
            </Button>
          )}
        </div>
      )}
      {/* </DialogTrigger> */}
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Username */}
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Guild */}
            <FormField
              control={form.control}
              name='guild'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guild</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a guild' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GUILDS.map((guild) => (
                        <SelectItem key={guild} value={guild}>
                          {guild.charAt(0).toUpperCase() + guild.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Amount and Date */}
            <div className='flex space-x-4'>
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        // step="0.01"
                        placeholder='Enter amount'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button type='submit' disabled={loading}>
              {loading ? (
                <>
                  <span className='mr-2'>Loading...</span>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
