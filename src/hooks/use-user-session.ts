import { useState, useEffect } from 'react'
import { AuthSession as SupabaseAuthSession } from '@supabase/supabase-js'

import { supabase } from '@lib'

/**
 * Don't do Redux dispatch because it will pollute the actions.
 */
export function useUserSession() {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState<SupabaseAuthSession | null>(null)

  useEffect(() => {
    try {
      setUser(supabase.auth.user())
      setSession(supabase.auth.session())

      supabase.auth.onAuthStateChange(
        (_event: string, session: SupabaseAuthSession | null) => {
          setUser(user)
          setSession(session)
        }
      )
    } catch (error) {
      setUser(null)
      setSession(null)
    }
  }, [])

  return { user, session }
}
