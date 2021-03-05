module.exports = {
  images: {
    domains: [
      'localhost',
      'api.catamyst.com',
      'storage.catamyst.com',
      'res.cloudinary.com',
      'amazonaws.com',
      'bit.ly',
      'datocms-assets.com',
      'a.storyblok.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
