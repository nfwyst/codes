const express = require('express')
const PositionController = require('./position')

module.exports = app => {
  // 仓位业务路由
  const PositionRouter = express.Router()
  new PositionController(PositionRouter)
  app.use('/position', PositionRouter)
}
