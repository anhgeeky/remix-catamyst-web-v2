const excludes = [
  '/404',
  '/cms/*',
  '/dashboard/*',
  '/onboard/*',
  '/reset',
  '/secret',
  '/settings/*',
]

module.exports = {
  siteUrl: 'https://catamyst.com',
  generateRobotsTxt: true,
  exclude: excludes,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: excludes,
      },
    ],
  },
}
