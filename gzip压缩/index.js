const fs = require('fs')
const zlib = require('zlib')
const path = require('path')

function gzip(src) {
  fs
    .createReadStream(src)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(`${src}.gz`))
}

function gunzip(src) {
  fs
    .createReadStream(src)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(path.resolve(__dirname, path.basename(src, '.gz'))))
}

gzip(path.resolve(__dirname, 'msg.txt'))
gunzip(path.resolve(__dirname, 'msg.txt.gz'))
