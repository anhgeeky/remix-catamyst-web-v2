import { combineReducers } from 'redux'

import { authReducer as auth } from '@features/auth/reducers'

export default combineReducers({ auth })
