const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const privateKey = fs.readFileSync(path.resolve(__dirname, 'rsa_private.key'))

function encrypto(key, data) {
  const cipher = crypto.createCipher('blowfish', key)
  cipher.update(data, 'utf8', 'hex')
  return cipher.final('hex')
}

function decrypto(key, data) {
  const cipher = crypto.createDecipher('blowfish', key)
  cipher.update(data, 'hex', 'utf8')
  return cipher.final('utf8')
}

const encoded = encrypto(privateKey, 'hello')
const decoded = decrypto(privateKey, encoded)

console.log(encoded, decoded)
