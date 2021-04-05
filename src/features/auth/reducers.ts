import {
  SIGN_UP_BEGIN,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_IN_BEGIN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_PASSWORDLESS_BEGIN,
  SIGN_IN_PASSWORDLESS_ERROR,
  SIGN_IN_PASSWORDLESS_SUCCESS,
  SIGN_OUT_BEGIN,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
} from '@features/auth/types'

/**
 * Reducer only used for UI/UX purpose.
 * Not for the actual authentication/authorization process.
 * Because we would use Cookie and HTTP headers.
 */
export function authReducer(
  state = {
    isAuthenticated: false,
    isLoading: false,
    profile: {
      avatar_url: '',
      handle: '',
      name: '',
    },
  },
  action
) {
  switch (action.type) {
    /**
     * Sign up begin/error/success.
     */
    case SIGN_UP_BEGIN: {
      return { ...state, isLoading: true }
    }
    case SIGN_UP_ERROR: {
      return { ...state, isLoading: false, isAuthenticated: false }
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        profile: action.payload,
      }
    }
    /**
     * Sign in begin/error/success.
     */
    case SIGN_IN_BEGIN: {
      return { ...state, isLoading: true }
    }
    case SIGN_IN_ERROR: {
      return { ...state, isLoading: false, isAuthenticated: false }
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        profile: action.payload,
      }
    }
    /**
     * Sign in passwordless begin/error/success.
     */
    case SIGN_IN_PASSWORDLESS_BEGIN: {
      return { ...state, isLoading: true }
    }
    case SIGN_IN_PASSWORDLESS_ERROR: {
      return { ...state, isLoading: false, isAuthenticated: false, profile: {} }
    }
    case SIGN_IN_PASSWORDLESS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        profile: action.payload,
      }
    }
    /**
     * Sign out begin/error/success.
     */
    case SIGN_OUT_BEGIN: {
      return { ...state, isLoading: true }
    }
    case SIGN_OUT_ERROR: {
      return { ...state, isLoading: false }
    }
    case SIGN_OUT_SUCCESS: {
      return { ...state, isLoading: false, isAuthenticated: false, profile: {} }
    }
    /**
     * Default.
     */
    default:
      return state
  }
}
