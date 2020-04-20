const fetch = require('node-fetch')
const config = require('../config')

class SafeRequest {
  constructor(url) {
    this.url = url
    this.baseUrl = config.baseUrl
  }

  fetch(options = {}) {
    let fe = fetch(this.baseUrl + this.url, options)
    return new Promise((resolve, reject) => {
      let result = {
        code: 0,
        message: "",
        data: []
      }
      fe
        .then(res => {
          let _json = {}
          try {
            _json = res.json()
          } catch { }
          return _json
        })
        .then(json => {
          result.data = json
          resolve(result)
        })
        .catch(err => {
          result.code = 1
          result.message = 'node-fetch error'
          result.rawError = err
          reject(result)
        })
    })
  }
}

module.exports = SafeRequest
