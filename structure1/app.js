const Koa = require('koa')
const co = require('co')
const render = require('koa-swig')
const static = require('koa-static')
const log4js = require('log4js')
const errorHandler = require('./middleware/error')
const config = require('./config')

const app = new Koa()

log4js.configure({
  appenders: { cheese: { type: 'file', filename: `${config.logDir}/log.log` } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})
const logger = log4js.getLogger('cheese')
errorHandler.error(app, logger)

app.use(static(config.staticDir))

require('./controllers')(app)

app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  cache: false,
  ext: 'html',
  writeBody: false,
  varControls: ['[[', ']]']
}))

app.listen(config.port, () => {
  console.log(`server start on port ${config.port}`)
})
