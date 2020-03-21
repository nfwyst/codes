const fs = require('fs')
const zlib = require('zlib')
const path = require('path')

function gzip(src) {
  fs
    .createReadStream(src)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(`${src}.gz`))
}

gzip(path.resolve(__dirname, 'msg.txt'))
