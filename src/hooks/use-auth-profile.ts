import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { supabase } from '@lib'

export function useAuthProfile() {
  const user = supabase.auth.user()
  const auth = useSelector((state) => state.auth)
  const [profile, setProfile] = useState()

  useEffect(() => {
    user && !profile && getUserProfile()
  }, [])

  const getUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`created_at, handle, name, avatar_url`)
        .eq('id', user!.id)
        .single()
      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('error', error.message)
    }
  }

  return {
    auth,
    user,
    profile,
  }
}
