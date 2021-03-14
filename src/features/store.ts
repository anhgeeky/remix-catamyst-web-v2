import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import storage from '@features/reduxPersist' // custom localStorage for web

/**
 * Import the combined reducer
 */

// import createRootReducer from '@features/reducers'
import rootReducer from '@features/reducer'

/**
 * Setup array of Redux middlewares
 * Only use logger in development
 */

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: true })
  middlewares.push(logger)
}

/**
 * Configure Redux Persist
 */

const persistConfig = {
  key: 'root',
  debug: false,
  storage,
  stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * Export Redux store and persistor
 */
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export const persistor = persistStore(store)
