import { useState, useEffect } from 'react'
import { AuthSession as SupabaseAuthSession } from '@supabase/supabase-js'
import { useDispatch } from 'react-redux'

import { supabase } from '@lib'
import { signInMagic, signOut } from '@features/auth/actions'
import { useAuth } from '@hooks'
import { isDev } from '@utils'

export function useUserSession() {
  const dispatch = useDispatch()
  const { auth } = useAuth()
  const [session, setSession] = useState<SupabaseAuthSession | null>(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    handleUserSession()
    handleUserSessionChange()
  }, [])

  const handleUserSession = async () => {
    try {
      const globalSession = supabase.auth.session()

      // Auto sign out expired session
      if (auth.isAuthenticated && !globalSession) {
        if (isDev) console.info('>>> Indicates actually not authenticated')
        dispatch(signOut(false))
        throw new Error('User not authenticated')
      }

      setSession(globalSession)
      setUser(globalSession?.user ?? null)
    } catch (error) {
      if (isDev) console.info('>>> Error on handleUserSession')
      // dispatch(signOut(false))
      // supabase.auth.signOut()
      setUser(null)
      setSession(null)
    }
  }

  const handleUserSessionChange = async () => {
    try {
      const globalSession = supabase.auth.session()

      const { data: supabaseAuthListener } = supabase.auth.onAuthStateChange(
        async (event: string, session: SupabaseAuthSession | null) => {
          if (isDev) {
            console.info('>>> Auth state has changed.')
            console.info({ event })
          }

          setSession(globalSession)
          setUser(globalSession?.user ?? null)
          if (globalSession) dispatch(signInMagic())

          if (event === 'PASSWORD_RECOVERY') {
            if (isDev) console.info('update_password')
          }
          if (event === 'USER_UPDATED')
            setTimeout(() => {
              if (isDev) console.info('sign_in')
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
      if (isDev) console.info('>>> Error on handleUserSessionChange')
      // dispatch(signOut(false))
      // supabase.auth.signOut()
      setUser(null)
      setSession(null)
    }
  }

  return { user, session }
}
