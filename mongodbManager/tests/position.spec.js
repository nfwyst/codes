const superagent = require('supertest')
const app = require('../app')

const request = superagent(app.listen())

describe("仓位业务测试", function () {
  let oid = null

  it('创建仓位记录', function (done) {
    request
      .post('/position/create')
      .send({
        account: '001',
        stock: 'AMZN',
        quantity: 1,
        price: 1650
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        if (res.body.code === 0 && res.body.message === '创建成功') {
          done()
        } else {
          done(new Error('创建仓位记录出错'))
        }
      })
  })

  it('根据帐号查询仓位记录', function (done) {
    request
      .get('/position/001')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        const entry = res.body.data[0]
        if (err) {
          done(err)
        }
        if (
          entry.account === '001' &&
          entry.stock === 'AMZN' &&
          entry.quantity === 1 &&
          entry.price === 1650
        ) {
          oid = entry._id
          done()
        } else {
          done(new Error('查询仓位记录出错'))
        }
      })
  })

  it('根据帐号id删除仓位记录', function (done) {
    request
      .delete(`/position/${oid}/delete`)
      .expect(200)
      .end(function (err, res) {
        if (err) done(err)
        if (res.text === '仓位记录删除成功') {
          done()
        } else {
          done(new Error('删除仓位记录失败'))
        }
      })
  })
})
