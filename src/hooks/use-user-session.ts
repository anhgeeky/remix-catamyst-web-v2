import { useState, useEffect } from 'react'
import { AuthSession as SupabaseAuthSession } from '@supabase/supabase-js'
import { useDispatch } from 'react-redux'

import { supabase } from '@lib'
import { signInMagic, signOut } from '@features/auth/actions'
import { useAuth } from '@hooks'
import { isDev } from '@utils'

/**
 * Don't do Redux dispatch because it will pollute the actions.
 */
export function useUserSession() {
  const { auth } = useAuth()
  const dispatch = useDispatch()
  const [session, setSession] = useState<SupabaseAuthSession | null>(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (isDev) console.info('>>> useEffect in useUserSession is run.')

    try {
      const session = supabase.auth.session()

      if (auth.isAuthenticated && !session) {
        if (isDev) console.info('>>> User is actually not authenticated')
        dispatch(signOut(false))
        throw new Error('Not authenticated')
      }

      setSession(session)
      setUser(session?.user ?? null)

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (_event: string, session: SupabaseAuthSession | null) => {
          if (isDev) console.info('>>> Supabase auth state has changed.')
          if (session) dispatch(signInMagic())
          setSession(session)
          setUser(session?.user ?? null)
        }
      )

      return () => {
        authListener.unsubscribe()
      }
    } catch (error) {
      if (isDev) console.info('>>> Error on Supabase happened')
      dispatch(signOut(false))
      supabase.auth.signOut()
      setUser(null)
      setSession(null)
    }
  }, [])

  return { user, session }
}
