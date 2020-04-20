const _ = require('lodash')
const { join } = require('path')

const base = join.bind(null, __dirname)

let config = {
  viewDir: base('..', 'views'),
  staticDir: base('..', 'assets'),
  logDir: base('..', 'logs'),
  baseUrl: 'http://locahost/java'
}

if (process.env.NODE_ENV === 'development') {
  _.extend(config, {
    port: 3000
  })
} else if (process.env.NODE_ENV === 'production') {
  _.extend(config, {
    port: 80
  })
}

module.exports = config
