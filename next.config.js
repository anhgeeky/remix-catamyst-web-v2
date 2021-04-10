module.exports = {
  future: {
    webpack5: true,
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
      { source: '/pro', destination: '/settings/pro', permanent: true },
      { source: '/super', destination: '/settings/super', permanent: true },
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
