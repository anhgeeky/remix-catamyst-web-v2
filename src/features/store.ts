import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
// import { createLogger } from 'redux-logger'

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
// middlewares.push(createLogger({ collapsed: true }))

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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
