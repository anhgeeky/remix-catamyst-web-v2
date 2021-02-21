import {
  SIGN_IN_BEGIN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_BEGIN,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
} from './types'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: {},
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    /**
     * Sign in
     */
    case SIGN_IN_BEGIN: {
      return { ...state, isLoading: true }
    }
    case SIGN_IN_ERROR: {
      return { ...state, isLoading: false, isAuthenticated: false, user: {} }
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      }
    }
    /**
     * Sign out
     */
    case SIGN_OUT_BEGIN: {
      return { ...state, isLoading: true }
    }
    case SIGN_OUT_ERROR: {
      return { ...state, isLoading: false }
    }
    case SIGN_OUT_SUCCESS: {
      return { ...state, isLoading: false, isAuthenticated: false, user: {} }
    }
    /**
     * Default
     */
    default:
      return state
  }
}
