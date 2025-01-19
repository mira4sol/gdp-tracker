'use client'

import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

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
