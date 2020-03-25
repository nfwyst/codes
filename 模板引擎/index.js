const obj = { user: { name: 'bob', age: 99 } }


function render(str, data) {
  const head = 'let tpl = ``; \r\nwith(obj) {\r\n tpl += `'
  str = str.replace(/<%([\s\S]+?)%>/g, function () {
    return '`;' + arguments[1] + '\r\n' + 'tpl +=`'
  })
  const tail = '`\r\n} \r\nreturn tpl\r\n'
  const html = head + str + tail
  console.log(html)
  const fn = new Function('obj', html)
  return fn(data)
}

const str = `
  <% if(user) { %>
    hello user
  <% } else { %>
    hello guest
  <% } %>
`
const result = render(str, obj)
console.log(result)
