const superagent = require('supertest')
const app = require('./app')

function request() {
  return superagent(app.listen())
}

describe("node interface test", function () {
  it('test interface', function (done) {
    request()
      .get('/test')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        if (res.body.hello === 'world') {
          done()
        } else {
          done(new Error('interface error'))
        }
      })
  })
})
