import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { supabase } from '@lib'
import { useSWR, fetcher } from '@utils'

export function useApiProfile(fields = `id, role, mode`) {
  const user = supabase.auth.user()
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  const { data, error } = useSWR(`/api/auth/profile/${user.id}`, fetcher)

  const isAuthenticated = auth.isAuthenticated && user
  const isAuthorized =
    data?.profile?.role === 'Admin' ||
    data?.profile?.role === 'Staff' ||
    data?.profile?.role === 'Mentor'

  return {
    router,
    auth,
    isAuthenticated,
    isAuthorized,
    user,
    profile: data?.profile || null,
  }
}
