/**
 * @fileoverview 处理仓位数据业务逻辑的文件
 * @author <nfwyst@gmail.com>
 */

const Position = require('../models/position')

// 处理仓位数据业务的控制器类
class PositionController {
  /**
   * @constructor
   */
  constructor(router) {
    router
      .post('/create', this.createPosition)
      .get('/:account', this.queryPosition)
      .put('/:id/update', this.updatePosition)
      .delete('/:id/delete', this.deletePosition)
  }


  /**
   * 创建仓位
   * @param {object} req instanceof Express.Request
   * @param {object} res instanceof Express.Response
   * @param {function}  next 下一个中间件处理器
   * @return {undefined}
   */
  createPosition(req, res, next) {
    const position = new Position({
      account: req.body.account,
      stock: req.body.stock,
      quantity: req.body.quantity,
      price: req.body.price
    })
    // 写入数据库
    position.save(function (err) {
      if (err) {
        return next(err)
      }
      res.send({
        code: 0,
        message: '创建成功'
      })
    })
  }


  /**
   * 通过交易帐号读取仓位记录
   * @param {object} req instanceof Express.Request
   * @param {object} res instanceof Express.Response
   * @param {function}  next 下一个中间件处理器
   * @return {undefined}
   */
  queryPosition(req, res, next) {
    Position.find({
      account: req.params.account
    }).then(position => {
      res.send({
        code: 0,
        message: '搜索成功',
        data: position
      })
    }).catch(next)
  }

  /**
   * 通过仓位记录的id更新仓位
   * @param {object} req instanceof Express.Request
   * @param {object} res instanceof Express.Response
   * @param {function}  next 下一个中间件处理器
   * @return {undefined}
   */
  updatePosition(req, res, next) {
    console.log(req.params.id)
    Position.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { useFindAndModify: false }, function (err, result) {
      console.log(result)
      if (err) return next(err)
      res.send({
        code: 0,
        message: '更新仓位记录成功'
      })
    })
  }

  /**
   * 根据仓位记录的id删除文档
   * @param {object} req instanceof Express.Request
   * @param {object} res instanceof Express.Response
   * @param {function}  next 下一个中间件处理器
   * @return {undefined}
   */
  deletePosition(req, res, next) {
    Position.findByIdAndRemove(req.params.id, {
      useFindAndModify: false
    }, function (err) {
      if (err) return next(err)
      res.send('仓位记录删除成功')
    })
  }
}

module.exports = PositionController
