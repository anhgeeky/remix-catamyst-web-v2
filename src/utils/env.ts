export const NODE_ENV = process.env.NODE_ENV
export const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL
export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const isDev = process.env.NODE_ENV !== 'production'
export const isProd = process.env.NODE_ENV === 'production'
export const isVercel = process.env.VERCEL

export const env = {
  NODE_ENV,
  WEB_URL,
  API_URL,
  isDev,
  isProd,
  isVercel,
}
