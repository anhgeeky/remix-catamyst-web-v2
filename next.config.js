module.exports = {
  poweredByHeader: false,
  reactStrictMode: true,
  // distDir: 'build',
  future: {
    webpack5: true,
    strictPostcssConfiguration: true,
  },
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
  async headers() {
    return [
      { source: '/', headers: securityHeaders },
      { source: '/:path*', headers: securityHeaders },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

const gumroad = `gumroad.com *.gumroad.com gum.co`
const stripe = `stripe.com *.stripe.com`
const paypal = `paypal.com *.paypal.com`

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.youtube.com *.twitter.com cdn.splitbee.io *.sentry.io *.getsentry.net ${gumroad} ${stripe} ${paypal};
  frame-src 'self' ${gumroad} ${paypal};
  child-src 'self' *.google.com *.youtube.com *.twitter.com ${gumroad} ${stripe} ${paypal};
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'self' 'none';
  font-src 'self';
  connect-src *;
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]
