'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const login = async () => {
  const supabase = await createClient()

  const headersList = await headers()
  const host = headersList.get('X-Forwarded-Host')
  const proto = headersList.get('X-Forwarded-Proto')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${proto}://${host}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('Auth error:', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect(data.url)
}

export const logout = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
