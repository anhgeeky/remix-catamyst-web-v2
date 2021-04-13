export const isDev =
  process.env.NODE_ENV !== 'production' || !process.env.VERCEL
export const isProd =
  process.env.NODE_ENV === 'production' || process.env.VERCEL
