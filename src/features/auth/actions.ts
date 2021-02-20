import {
  SIGN_IN_BEGIN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_BEGIN,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
} from './types'

export const signIn = () => {
  return async (dispatch) => {
    dispatch({ type: SIGN_IN_BEGIN })
    const error = false
    if (error) {
      dispatch({ type: SIGN_IN_ERROR })
    } else {
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: {
          user: {
            name: 'Catamyst',
            handle: 'catamyst',
          },
        },
      })
    }
  }
}

export const signOut = () => {
  return async (dispatch) => {
    dispatch({ type: SIGN_OUT_BEGIN })
    const error = false
    if (error) {
      dispatch({ type: SIGN_OUT_ERROR })
    } else {
      dispatch({ type: SIGN_OUT_SUCCESS })
    }
  }
}
