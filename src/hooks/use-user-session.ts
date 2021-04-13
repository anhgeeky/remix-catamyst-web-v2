import { useState, useEffect } from 'react'
import { AuthSession as SupabaseAuthSession } from '@supabase/supabase-js'
import { useDispatch } from 'react-redux'

import { supabase } from '@lib'
import { signOut } from '@features/auth/actions'
import { useAuth } from '@hooks'

/**
 * Don't do Redux dispatch because it will pollute the actions.
 */
export function useUserSession() {
  const { auth } = useAuth()
  const dispatch = useDispatch()
  const [session, setSession] = useState<SupabaseAuthSession | null>(null)
  const [user, setUser] = useState(null)

  // console.info({ session, user })

  useEffect(() => {
    try {
      // console.log('useEffect in useUserSession...')
      if (!auth.isAuthenticated) throw new Error('Not authenticated')

      const session = supabase.auth.session()
      if (!session) throw new Error('Not authenticated')

      setSession(session)
      setUser(session?.user ?? null)

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event: string, session: SupabaseAuthSession | null) => {
          setSession(session)
          setUser(session?.user ?? null)
        }
      )

      return () => {
        authListener.unsubscribe()
      }
    } catch (error) {
      dispatch(signOut(false))
      supabase.auth.signOut()
      setUser(null)
      setSession(null)
    }
  }, [])

  return { user, session }
}
