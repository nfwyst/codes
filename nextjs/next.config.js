const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')

module.exports = {
  webpack(config, ...args) {
    config = withCss().webpack(config, ...args)
    config = withSass({
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]_[hash:base64:5]'
      }
    }).webpack(config, ...args)
    return config
  }
}
