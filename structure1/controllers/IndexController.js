const IndexModel = require('../models/Index')
const { URLSearchParams } = require('url')

class IndexController {
  constructor() { }

  /**
   * 显示首页
   */
  actionIndex() {
    return async (ctx, next) => {
      const index = new IndexModel()
      const result = await index.getData({})
      ctx.body = await ctx.render('index', { data: result.data })
    }
  }

  /**
   * 添加图书
   */
  actionAdd() {
    return async (ctx, next) => {
      const params = new URLSearchParams()
      params.append('Books[name]', 'test')
      params.append('Books[author]', 'data')
      const index = new IndexModel()
      const result = await index.saveData({ body: params })
      ctx.body = result
    }
  }
}

module.exports = IndexController
