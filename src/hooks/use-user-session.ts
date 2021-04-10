import { useState, useEffect } from 'react'
import { AuthSession as SupabaseAuthSession } from '@supabase/supabase-js'
import { useDispatch } from 'react-redux'

import { supabase } from '@lib'
import { signOut } from '@features/auth/actions'

/**
 * Don't do Redux dispatch because it will pollute the actions.
 */
export function useUserSession() {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [session, setSession] = useState<SupabaseAuthSession | null>(null)

  useEffect(() => {
    try {
      const session = supabase.auth.session()

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
