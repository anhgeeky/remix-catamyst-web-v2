import { useState, useEffect } from 'react'
import { AuthSession as SupabaseAuthSession } from '@supabase/supabase-js'

import { supabase } from '@lib'

/**
 * Don't do Redux dispatch because it will pollute the actions.
 */
export function useSession() {
  const [session, setSession] = useState<SupabaseAuthSession | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange(
      (_event: string, session: SupabaseAuthSession | null) => {
        setSession(session)
      }
    )
  }, [])

  return session
}
