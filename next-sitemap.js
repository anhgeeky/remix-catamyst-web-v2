const excludes = [
  '/404',
  '/500',
  '/cms',
  '/cms/*',
  '/dashboard',
  '/dashboard/*',
  '/debug',
  '/join',
  '/login',
  '/logout',
  '/members',
  '/members/*',
  '/members/top',
  '/onboard',
  '/onboard/*',
  '/projects',
  '/register',
  '/reset',
  '/secret',
  '/settings',
  '/settings/*',
  '/signout',
  '/tracks',
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
