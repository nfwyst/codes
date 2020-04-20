/**
 * @fileoverview 实现 Index 的数据模型
 * @author nfwyst@gmail.com
 */
const SafeRequest = require('../utils/SafeRequest')

/**
 * Index 类， 获取图书数据的类
 */
class Index {
  /**
   * @constructor
   * @param {string} app Koa2 的上下文
   */
  constructor(app) {
  }

  /**
   * 获取后台全部图书列表
   * @param {*} options 当前请求的匹配项
   * @example
   * return new Promise
   * getData(options)
   * @return {Promise}
   */
  getData(options) {
    const safeRequest = new SafeRequest('/books/index')
    return safeRequest.fetch(options)
  }

  /**
   * 保存图书数据
   * @param {*} options 当前请求传入的数据
   * @example
   * return new Promise
   * saveData(options)
   * @return {Promise}
   */
  saveData(options) {
    const safeRequest = new SafeRequest('/books/create')
    return safeRequest.fetch({
      ...options,
      method: 'POST',
    })
  }
}

module.exports = Index
