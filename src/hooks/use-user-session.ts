import { useState, useEffect } from 'react'
import { AuthSession as SupabaseAuthSession } from '@supabase/supabase-js'
import { useDispatch } from 'react-redux'

import { supabase } from '@lib'
import { signInMagic, signOut } from '@features/auth/actions'
import { useAuth } from '@hooks'
import { isDev, isVercel } from '@utils'

export function useUserSession() {
  const dispatch = useDispatch()
  const { auth } = useAuth()
  const [session, setSession] = useState<SupabaseAuthSession | null>(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    handleUserSessionChange()
  }, [])

  const handleUserSessionChange = () => {
    try {
      const globalSession = supabase.auth.session()

      /**
       * Set data from database to be used for the entire app.
       */
      setSession(globalSession)
      setUser(globalSession?.user ?? null)

      /**
       * Auto signout expired session when isAuthenticated is still true/
       */
      // if (auth.isAuthenticated && !globalSession) {
      //   if (isDev) console.info('>>> Indicates actually not authenticated')
      //   dispatch(signOut(false))
      //   throw new Error('User not authenticated')
      // }

      /**
       * Handle when auth state has changed.
       */
      const { data: supabaseAuthListener } = supabase.auth.onAuthStateChange(
        async (event: string, session: SupabaseAuthSession | null) => {
          if (isDev) {
            console.info('>>> Auth state has changed with event.', { event })
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
