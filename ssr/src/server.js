import express from 'express'
import App from './components/App'
import React from 'react'
import { renderToString } from 'react-dom/server'

const app = express()

app.get('/', (req, res) => {
  const arr = [1, 2, 3, 4]
  res.send(renderToString(<App lists={arr} />))
})

app.listen(3000, function () {
  console.log('server is running on port 3000');
})
