'use client'

import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  user: (User & { role?: string }) | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<(User & { role?: string }) | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchRole = async () => {
    if (!user) return
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!error && data) {
      setUser((currentUser) =>
        currentUser ? { ...currentUser, role: data.role } : null
      )
    }
  }

  const checkLogin = async () => {
    // Check active sessions and subscribe to auth changes
    const supabase = await createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Cleanup subscription
    // return () => subscription.unsubscribe()
  }

  useEffect(() => {
    checkLogin()
  }, [])

  useEffect(() => {
    if (user) {
      fetchRole()
    }
  }, [user])

  const value = {
    isLoggedIn: !!user,
    user,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
