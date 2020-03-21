const http = require('http')

const options = {
  host: 'localhost',
  port: 8080,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
}

const request = http.request(options)
request.on('response', res => {
  console.log(`HTTP/1.1 ${res.statusCode}\r\n${Object.entries(res.headers).map(([k, v]) => `${k}: ${v}`).join('\r\n')}`)
  const result = []
  res.on('data', data => {
    result.push(data)
  }).on('end', () => {
    let str = Buffer.concat(result).toString('utf8')
    console.log(`\r\n${str}`)
  })
})
request.write('name=xyz')
request.end()
