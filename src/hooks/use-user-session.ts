import { useState, useEffect } from 'react'
import { AuthSession as SupabaseAuthSession } from '@supabase/supabase-js'
import { useDispatch } from 'react-redux'

import { supabase } from '@/lib'
import { signInMagic, signOut } from '@/features/auth/actions'
import { useAuth } from '@/hooks'
import { isDev } from '@/utils'

export function useUserSession() {
  const dispatch = useDispatch()
  const { auth } = useAuth()
  const [session, setSession] = useState<SupabaseAuthSession | null>(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    handleUserSessionChange()
  }, [])

  const handleUserSessionChange = async () => {
    try {
      const globalSession = await supabase.auth.session()

      /**
       * Set data from database to be used for the entire app.
       */
      setSession(globalSession)
      setUser(globalSession?.user ?? null)

      /**
       * Auto signout expired session when isAuthenticated is still true
       */
      if (auth.isAuthenticated && !globalSession) {
        if (isDev) console.info('>>> Indicates actually not authenticated')
        dispatch(signOut(false))
        throw new Error('User not authenticated')
      }

      /**
       * Handle when auth state has changed.
       */
      const { data: supabaseAuthListener } = supabase.auth.onAuthStateChange(
        async (event: string, newGlobalSession: SupabaseAuthSession | null) => {
          // if (isDev) console.info('>>>', { event })

          setSession(newGlobalSession)
          setUser(newGlobalSession?.user ?? null)

          if (newGlobalSession) dispatch(signInMagic())
          if (event === 'SIGNED_IN') {
            // if (isDev) console.info('SIGNED_IN')
            dispatch(signInMagic())
          }
          if (event === 'PASSWORD_RECOVERY') {
            // if (isDev) console.info('PASSWORD_RECOVERY')
          }
          if (event === 'USER_UPDATED')
            setTimeout(() => {
              if (isDev) console.info('USER_UPDATED')
            }, 1000)
        }
      )

      return () => {
        supabaseAuthListener.unsubscribe()
      }
    } catch (error) {
      if (isDev) console.info('>>> Error on handleUserSessionChange')
      dispatch(signOut(false))
      supabase.auth.signOut()
      setUser(null)
      setSession(null)
    }
  }

  return { user, session }
}
