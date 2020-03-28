const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const stat = promisify(fs.stat)
const mime = require('mime')

module.exports = ({ rootDir }) => async (ctx, next) => {
  const localFilePath = path.join(rootDir, ctx.path)
  try {
    const stats = await stat(localFilePath)
    if (stats.isFile()) {
      ctx.res.setHeader('Content-Type', `${mime.getType(localFilePath)}; charset=utf8`)
      ctx.body = fs.createReadStream(localFilePath)
    } else {
      return next()
    }
  } catch (e) {
    return next()
  }
}
