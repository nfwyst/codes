const TinyKoa = require('./Koa')
const path = require('path')
const static = require('./middlewares/koa-static')
const Router = require('./middlewares/koa-router')

const port = 80
const app = new TinyKoa()
const router = new Router()

router.all('/api/post', async (ctx, next) => {
  ctx.body = 'post'
  return next()
})

app.use(router.routes())

app.use(static({ rootDir: path.join(__dirname, './static') }))

app.use(async (ctx, next) => {
  ctx.body = 'hello'
  await next()
})

app.use(async (ctx, next) => {
  ctx.body = 'hello2'
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000);
  })
  await next()
})

app.use(async (ctx, next) => {
  ctx.body = 'hello3'
  next()
})

app.listen(port, () => {
  console.log('runing on port' + port)
})
