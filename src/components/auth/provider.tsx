import { useUserSession } from '@hooks'

/**
 * Can be used as a component for _app.tsx
 * Depends on ReduxProvider
 */
export function AuthProvider() {
  /**
   * Call useUserSession to get session and user.
   */
  useUserSession()

  return <></>
}
