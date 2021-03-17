const excludes = [
  '/404',
  '/cms/*',
  '/dashboard/*',
  '/join',
  '/login',
  '/logout',
  '/onboard/*',
  '/register',
  '/reset',
  '/secret',
  '/settings/*',
  '/signout',
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
