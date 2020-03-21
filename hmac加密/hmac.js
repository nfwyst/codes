const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

let key = fs.readFileSync(path.join(__dirname, 'rsa_private.key'))

const result = crypto
  .createHmac('sha1', key)
  .update('hello')
  .digest('hex')

// 40位摘要
console.log(result)
