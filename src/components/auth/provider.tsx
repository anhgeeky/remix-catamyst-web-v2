import { useUserSession } from '@hooks'

export function AuthProvider() {
  /**
   * Call useUserSession to get session and user.
   */
  useUserSession()

  return <></>
}
