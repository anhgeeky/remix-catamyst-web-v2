import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

/**
 * Solve issue of redux-persist failed to create sync storage.
 * falling back to noop storage.
 * https://github.com/rt2zz/redux-persist/issues/1208
 * https://github.com/vercel/next.js/discussions/15687
 */
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null)
    },
    setItem(_key, value) {
      return Promise.resolve(value)
    },
    removeItem(_key) {
      return Promise.resolve()
    },
  }
}

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local') // Must use this name
    : createNoopStorage()

export default storage
