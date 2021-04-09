import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { supabase } from '@lib'

type Profile = {
  id: string
  role?: string
  mode?: string
}

/**
 * Similar to useAuth but need profile fields.
 */
export function useAuthProfile(fields = `id, role, mode`) {
  const router = useRouter()
  const user = supabase.auth.user()
  const auth = useSelector((state) => state.auth)
  const [profile, setProfile] = useState<Profile>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserProfile()
  }, [user])

  const getUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(fields)
        .eq('id', user!.id)
        .single()
      if (error) throw error
      setProfile(data)
      setLoading(false)
    } catch (error) {
      console.error('error', error.message)
      setLoading(false)
    }
  }

  const isAuthenticated = auth.isAuthenticated && user
  const isAuthorized =
    profile?.role === 'Admin' ||
    profile?.role === 'Staff' ||
    profile?.role === 'Mentor'

  return {
    router,
    auth,
    isAuthenticated,
    isAuthorized,
    user,
    profile,
    loading,
  }
}
