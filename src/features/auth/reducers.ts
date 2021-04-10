import {
  SIGN_UP_BEGIN,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_IN_BEGIN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_MAGIC_BEGIN,
  SIGN_IN_MAGIC_ERROR,
  SIGN_IN_MAGIC_SUCCESS,
  SIGN_OUT_BEGIN,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
} from '@features/auth/types'

/**
 * Reducer only used for UI/UX purpose.
 * Not for the actual authentication/authorization process.
 * Currently used for maintaining the legacy auth data within components.
 */
export function authReducer(
  state = { isLoading: false, isAuthenticated: false },
  action
) {
  switch (action.type) {
    /**
     * Sign up begin/error/success.
     */
    case SIGN_UP_BEGIN: {
      return { isLoading: true, isAuthenticated: false }
    }
    case SIGN_UP_ERROR: {
      return { isLoading: false, isAuthenticated: false }
    }
    case SIGN_UP_SUCCESS: {
      return { isLoading: false, isAuthenticated: true }
    }
    /**
     * Sign in begin/error/success.
     */
    case SIGN_IN_BEGIN: {
      return { isLoading: true, isAuthenticated: false }
    }
    case SIGN_IN_ERROR: {
      return { isLoading: false, isAuthenticated: false }
    }
    case SIGN_IN_SUCCESS: {
      return { isLoading: false, isAuthenticated: true }
    }
    /**
     * Sign in magic begin/error/success.
     */
    case SIGN_IN_MAGIC_BEGIN: {
      return { isLoading: true }
    }
    case SIGN_IN_MAGIC_ERROR: {
      return { isLoading: false, isAuthenticated: false }
    }
    case SIGN_IN_MAGIC_SUCCESS: {
      return { isLoading: false, isAuthenticated: true }
    }
    /**
     * Sign out begin/error/success.
     */
    case SIGN_OUT_BEGIN: {
      return { isLoading: true }
    }
    case SIGN_OUT_ERROR: {
      return { isLoading: false, isAuthenticated: false }
    }
    case SIGN_OUT_SUCCESS: {
      return { isLoading: false, isAuthenticated: false }
    }
    /**
     * Default.
     */
    default:
      return state
  }
}
