import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { supabase } from '@lib'

/**
 * Similar to useAuthProfile but doesn't need a profile.
 */
export function useAuth() {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()
  const user = supabase.auth.user()

  const isAuthenticated = auth.isAuthenticated && user
  // isAuthorized need profile check from database

  return {
    router,
    auth,
    user,
    isAuthenticated,
  }
}
