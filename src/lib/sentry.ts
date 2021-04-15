import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { RewriteFrames } from '@sentry/integrations'

export { Sentry, Integrations, RewriteFrames }

/**
 * https://github.com/vercel/next.js/tree/canary/examples/with-sentry
 */
export const SentryInit = () => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    const integrations = []

    if (
      process.env.NEXT_IS_SERVER === 'true' &&
      process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
    ) {
      integrations.push(new Integrations.BrowserTracing())
      // For Node.js, rewrite Error.stack to use relative paths, so that source
      // maps starting with ~/_next map to files in Error.stack with path
      // app:///_next
      integrations.push(
        new RewriteFrames({
          iteratee: (frame) => {
            frame.filename = frame.filename.replace(
              process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
              'app:///'
            )
            frame.filename = frame.filename.replace('.next', '_next')
            return frame
          },
        })
      )
    }

    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      enabled: process.env.NODE_ENV === 'production',
      release: process.env.NEXT_PUBLIC_COMMIT_SHA,
      integrations,
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // Recommend to adjust in production.
      // tracesSampleRate: 1.0,
    })
  }
}
