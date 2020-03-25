const fs = require('fs')
const path = require('path')

function render(filepath, data, callback) {
  fs.readFile(filepath, 'utf8', (err, str) => {
    if (err) return callback(err)
    try {
      const head = 'let tpl = ``; \r\nwith(obj) {\r\n tpl += `'
      str = str.replace(/<%=([\s\S]+?)%>/g, function () {
        return "${" + arguments[1] + "}"
      })
      str = str.replace(/<%([\s\S]+?)%>/g, function () {
        return '`;' + arguments[1] + '\r\n' + 'tpl +=`'
      })
      const tail = '`\r\n} \r\nreturn tpl\r\n'
      const html = head + str + tail
      const fn = new Function('obj', html)
      const result = fn(data)
      callback(null, result)
    } catch (e) {
      callback(e)
    }
  })
}

const obj = { user: { name: 'bob', age: 99 }, total: 5 }
render(path.resolve(__dirname, './index.html'), obj, (err, result) => {
  if (err) return console.log(err)
  console.log(result)
})
