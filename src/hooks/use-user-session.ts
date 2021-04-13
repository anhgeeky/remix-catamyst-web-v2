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
    // if (isDev) console.info('>>> useEffect in useUserSession is run.')

    try {
      const session = supabase.auth.session()

      if (auth.isAuthenticated && !session) {
        if (isDev) console.info('>>> User is actually not authenticated')
        dispatch(signOut(false))
        throw new Error('Not authenticated')
      }

      setSession(session)
      setUser(session?.user ?? null)

      const { data: supabaseAuthListener } = supabase.auth.onAuthStateChange(
        async (event: string, session: SupabaseAuthSession | null) => {
          if (isDev) {
            console.info('>>> Supabase auth state has changed.')
            console.info({ event })
          }

          setSession(session)
          setUser(session?.user ?? null)

          if (session) {
            dispatch(signInMagic())
          }

          if (event === 'PASSWORD_RECOVERY') {
            if (isDev) console.log('update_password')
          }

          if (event === 'USER_UPDATED')
            setTimeout(() => {
              if (isDev) console.log('sign_in')
            }, 1000)

          /**
           * Send session to /api/auth route to set the auth cookie.
           * Only needed if doing SSR (getServerSideProps)
           */
          fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session }),
          }).then((res) => res.json())
        }
      )

      return () => {
        supabaseAuthListener.unsubscribe()
      }
    } catch (error) {
      if (isDev) console.info('>>> Error on Supabase happened')
      // dispatch(signOut(false))
      // supabase.auth.signOut()
      setUser(null)
      setSession(null)
    }
  }, [])

  return { user, session }
}
