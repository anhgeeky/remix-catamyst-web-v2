const excludes = [
  '/404',
  '/500',
  '/cms',
  '/dashboard',
  '/debug',
  '/join',
  '/login',
  '/logout',
  '/members',
  '/members/top',
  '/onboard',
  '/register',
  '/reset',
  '/secret',
  '/settings',
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
