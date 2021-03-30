module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    domains: [
      'localhost',
      'api.catamyst.com',
      'storage.catamyst.com',
      'a.storyblok.com',
      'amazonaws.com',
      'apple.com',
      'bit.ly',
      'datocms-assets.com',
      'example.com',
      'google.com',
      'google.com',
      'placekitten.com',
      'res.cloudinary.com',
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
