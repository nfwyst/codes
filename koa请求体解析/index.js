const Koa = require('koa')
const querystring = require('querystring')
const path = require('path')
const fs = require('fs')
const uuid = require('uuid')
const app = new Koa()

// 通过 indexOf 实现 split
Buffer.prototype.split = function (sep) {
  let pos = 0
  let len = sep.length
  let index = -1
  let parts = []
  while (-1 !== (index = this.indexOf(sep, pos))) {
    parts.push(this.slice(pos, index))
    pos = len + index
  }
  if (pos < this.length - 1) parts.push(this.slice(pos))
  return parts
}

// 解析请求体
function getBody(req, sep, rootDir) {
  return new Promise((resolve, reject) => {
    let buffer = []
    req
      .on('data', data => {
        buffer.push(data)
      })
      .on('end', () => {
        try {
          const all = Buffer.concat(buffer)
          const fields = {}
          const lines = all.split(sep).slice(1, -1)
          lines.forEach(line => {
            let [desc, val] = line.split('\r\n\r\n')
            desc = desc.toString('utf8').replace(/\"/g, '')
            val = val.slice(0, -2)
            if (desc.includes('filename')) {
              const [, line1, line2] = desc.split('\r\n')
              const line1Obj = querystring.parse(line1, '; ')
              const line2Obj = querystring.parse(line2, '; ')
              const filepath = path.join(rootDir, uuid.v4())
              fs.writeFileSync(filepath, val)
              const dts = {
                ...line1Obj,
                ...line2Obj,
                filepath
              }
              fields[line1Obj.name] = [Object.entries(dts).reduce((cur, next) => {
                const [key, val] = next
                if (!val) {
                  const [key1, val1] = key.split(': ')
                  cur[key1] = val1
                } else {
                  cur[key] = val
                }
                return cur
              }, {})]
            } else {
              const { name } = querystring.parse(desc, '; ')
              fields[name] = val.toString('utf8')
            }
          })
          resolve(fields)
        } catch (e) {
          reject(e)
        }
      })
      .on('error', reject)
  })
}


function betterBodyParser({ rootDir }) {
  if (!rootDir) throw new Error('root directory missing')
  return async (ctx, next) => {
    const { headers } = ctx
    const contentType = headers['content-type']
    if (contentType && contentType.startsWith('multipart/form-data')) {
      const matches = contentType.match(/\bboundary=(.+)/)
      const sep = `--${matches[1]}`
      return ctx.body = await getBody(ctx.req, sep, rootDir)
    }
    return await next()
  }
}

app
  .use(betterBodyParser({
    rootDir: path.join(__dirname, 'uploads')
  }))
  .use(async (ctx, next) => {
    const { url, method } = ctx
    if (url === '/user' && method === 'GET') {
      ctx.body = `
        <form method="POST" enctype="multipart/form-data">
          <input name="username" type="text" />
          <input name="password" type="password" />
          <input name="avatar" type="file" />
          <input type="submit" />
        </form>
      `
    } else {
      return await next()
    }
  })
  .listen(80, 'localhost', () => console.log('server started'))
