import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { supabase } from '@lib'

export function useAuth(
  fields = `id, handle, name, nickname, role, mode, plan, website_url, avatar_url`
) {
  const [loading, setLoading] = useState<boolean>(true)
  const [profile, setProfile] = useState()
  const router = useRouter()
  const auth = useSelector((state) => state.auth)
  const user = supabase.auth.user()

  useEffect(() => {
    getUserProfile()
  }, [])

  const getUserProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select(fields)
        .eq('id', user!.id)
        .single()
      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('error', error.message)
    } finally {
      setLoading(false)
    }
  }

  /**
   * When user is signed in.
   */
  const isAuthenticated = auth.isAuthenticated && auth.user

  /**
   * When user is allowed to access.
   */
  const isAuthorized = auth.isAuthenticated && auth.user

  return {
    loading,
    router,
    isAuthenticated,
    isAuthorized,
    auth,
    user,
    profile,
  }
}
