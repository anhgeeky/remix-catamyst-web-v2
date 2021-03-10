module.exports = {
  images: {
    domains: [
      'localhost',
      'a.storyblok.com',
      'amazonaws.com',
      'api.catamyst.com',
      'bit.ly',
      'datocms-assets.com',
      'google.com',
      'placekitten.com',
      'res.cloudinary.com',
      'storage.catamyst.com',
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
