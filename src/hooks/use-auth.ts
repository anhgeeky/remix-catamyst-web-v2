import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { supabase } from '@lib'

export function useAuth() {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()
  const user = supabase.auth.user()

  /**
   * When user is signed in.
   */
  const isAuthenticated = auth.isAuthenticated && user

  /**
   * When user is allowed to access.
   */
  const isAuthorized = auth.isAuthenticated && user
  // && profile.role === 'Admin'

  return {
    router,
    auth,
    isAuthenticated,
    isAuthorized,
    user,
  }
}
