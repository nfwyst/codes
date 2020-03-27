const Koa = require('./lib/application')
const app = new Koa()
const port = 9300

app.use((ctx, next) => {
  ctx.body = 'hello koa'
  next()
})

app.listen(port, () => {
  console.log(`${port} listen`)
})
