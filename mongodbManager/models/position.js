/**
 * @fileoverview 仓位数据模型定义文件
 * @author <nfwyst@gmail.com>
 */


const mongoose = require('mongoose')

const PositionModel = mongoose.model('positions', {
  // 交易帐号
  account: {
    type: String,
    required: true
  },
  // 股票代码
  stock: {
    type: String,
    required: true,
  },
  // 交易的数量
  quantity: {
    type: Number,
    required: true
  },
  // 交易的价格
  price: {
    type: Number,
    required: true
  }
})

module.exports = PositionModel
