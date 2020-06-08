const express = require('express')
const bodyParser = require('body-parser')
const mockjs = require('mockjs')

const app = express()

app
  .use((req, res, next) => {
    const baseHeader = 'Access-Control-Allow'
    res.setHeader(`${baseHeader}-Origin`, '*')
    res.setHeader(`${baseHeader}-Methods`, 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader(`${baseHeader}-Headers`, 'Content-Type, Authorization, Accept-Language, X-Requested-With')
    if (req.method === 'OPTIONS') return res.status(200).end()
    return next()
  })
  .use(bodyParser.urlencoded({ extended: false }))

let id = 0
const datas = Array(100).fill(0).map(i => {
  return {
    pic: mockjs.Random.image('250x250'),
    name: mockjs.Random.csentence(50, 80),
    desc: mockjs.Random.csentence(80, 100),
    price: Math.floor(Math.random() * 10000),
    id: `${id++}`
  }
})

app.get('/list', (req, res, next) => {
  let { page = 1, pageSize = 10 } = req.query
  page = +page
  pageSize = +pageSize
  const offset = page > 1 ? (page - 1) * pageSize : 0
  res.send({
    data: datas.slice(offset, offset + pageSize),
    total: datas.length
  })
})

app.listen(4000, 'localhost', () => {
  console.log('服务器启动在端口 4000')
})
