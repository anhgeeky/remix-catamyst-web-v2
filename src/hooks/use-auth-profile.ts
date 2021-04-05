import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { supabase } from '@lib'

/**
 * Similar to useAuth but need profile fields.
 */
export function useAuthProfile(fields = `id,  role, mode`) {
  const router = useRouter()
  const user = supabase.auth.user()
  const auth = useSelector((state) => state.auth)
  const [profile, setProfile] = useState()

  const isAuthenticated = auth.isAuthenticated && user
  // @ts-ignore
  const isAuthorized = auth.isAuthenticated && user && profile?.role === 'Admin'

  useEffect(() => {
    user && !profile && getUserProfile()
  }, [])

  const getUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(fields)
        .eq('id', user!.id)
        .single()
      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('error', error.message)
    }
  }

  return {
    router,
    auth,
    isAuthenticated,
    isAuthorized,
    user,
    profile,
  }
}
