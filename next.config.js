// Use the SentryWebpack plugin to upload the source maps during build step
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  NODE_ENV,
  SENTRY_AUTH_TOKEN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  VERCEL_GIT_COMMIT_SHA,
} = process.env

process.env.SENTRY_DSN = SENTRY_DSN
const basePath = ''

module.exports = {
  // poweredByHeader: false,
  // reactStrictMode: true,
  // future: {
  //   webpack5: true,
  //   strictPostcssConfiguration: true,
  // },
  images: {
    domains: [
      'a.storyblok.com',
      'amazonaws.com',
      'api.catamyst.com',
      'apple.com',
      'avatars.githubusercontent.com',
      'bit.ly',
      'catamyst.com',
      'datocms-assets.com',
      'example.com',
      'google.com',
      'localhost',
      'placekitten.com',
      'res.cloudinary.com',
      'storage.catamyst.com',
    ],
  },
  async redirects() {
    return [
      { source: '/join', destination: '/signup', permanent: true },
      { source: '/login', destination: '/signin', permanent: true },
      { source: '/pro', destination: '/settings/pro', permanent: true },
      { source: '/super', destination: '/settings/super', permanent: true },
    ]
  },
  productionBrowserSourceMaps: true,
  env: {
    // Make the COMMIT_SHA available to the client so that Sentry events can be
    // marked for the release they belong to. It may be undefined if running
    // outside of Vercel
    NEXT_PUBLIC_COMMIT_SHA: VERCEL_GIT_COMMIT_SHA,
  },
  webpack: (config, options) => {
    // In `pages/_app.js`, Sentry is imported from @sentry/browser. While
    // @sentry/node will run in a Node.js environment. @sentry/node will use
    // Node.js-only APIs to catch even more unhandled exceptions.
    //
    // This works well when Next.js is SSRing your page on a server with
    // Node.js, but it is not what we want when your client-side bundle is being
    // executed by a browser.
    //
    // Luckily, Next.js will call this webpack function twice, once for the
    // server and once for the client. Read more:
    // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    //
    // So ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    // Define an environment variable so source code can check whether or not
    // it's running on the server so we can correctly initialize Sentry
    config.plugins.push(
      new options.webpack.DefinePlugin({
        'process.env.NEXT_IS_SERVER': JSON.stringify(
          options.isServer.toString()
        ),
      })
    )

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.
    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      VERCEL_GIT_COMMIT_SHA &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~${basePath}/_next`,
          release: VERCEL_GIT_COMMIT_SHA,
        })
      )
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  // async headers() {
  //   return [
  //     { source: '/', headers: securityHeaders },
  //     { source: '/:path*', headers: securityHeaders },
  //   ]
  // },
  basePath,
}

// const sites = `*.google.com *.youtube.com *.twitter.com`
// const supabase = `supabase.io supabase.co *.supabase.io *.supabase.co`
// const splitbee = `splitbee.io cdn.splitbee.io hive.splitbee.io *.splitbee.io`
// const sentry = `sentry.io *.sentry.io *.getsentry.net`
// const gumroad = `gumroad.com gum.co *.gumroad.com *.gum.co`
// const stripe = `stripe.com *.stripe.com`
// const paypal = `paypal.com *.paypal.com`

// https://securityheaders.com
// const ContentSecurityPolicy = `
//   default-src 'self';
//   script-src 'self' 'unsafe-eval' 'unsafe-inline' ${sites} ${supabase} ${splitbee} ${sentry} ${gumroad} ${stripe} ${paypal};
//   frame-src 'self' ${supabase} ${gumroad} ${paypal};
//   child-src 'self' ${sites} ${supabase} ${gumroad} ${stripe} ${paypal};
//   style-src 'self' 'unsafe-inline' *.googleapis.com;
//   img-src * blob: data:;
//   media-src 'self';
//   font-src 'self';
//   connect-src *;
// `

// const securityHeaders = [
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
//   {
//     key: 'Content-Security-Policy',
//     value: ContentSecurityPolicy.replace(/\n/g, ''),
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
//   {
//     key: 'Referrer-Policy',
//     value: 'origin-when-cross-origin',
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
//   {
//     key: 'X-Frame-Options',
//     value: 'DENY',
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
//   {
//     key: 'X-Content-Type-Options',
//     value: 'nosniff',
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
//   {
//     key: 'X-DNS-Prefetch-Control',
//     value: 'on',
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
//   {
//     key: 'Strict-Transport-Security',
//     value: 'max-age=31536000; includeSubDomains; preload',
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
//   {
//     key: 'Permissions-Policy',
//     value: 'camera=(), microphone=(), geolocation=()',
//   },
// ]
