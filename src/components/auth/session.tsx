import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AuthSession as SupabaseAuthSession } from '@supabase/supabase-js'

import { supabase } from '@lib'
import { signOut } from '@features/auth/actions'

export function AuthSession() {
  const dispatch = useDispatch()
  const [session, setSession] = useState<SupabaseAuthSession | null>(null)

  useEffect(() => {
    try {
      const session = supabase.auth.session()
      if (session) {
        setSession(session)
        supabase.auth.onAuthStateChange(
          (_event: string, session: SupabaseAuthSession | null) => {
            setSession(session)
          }
        )
      } else {
        supabase.auth.signOut()
        // dispatch(signOut())
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  return <></>
}
