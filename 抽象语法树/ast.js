const esprima = require('esprima')
const estraverse = require('estraverse')
const { inspect } = require('util')
const escodegen = require('escodegen')

const code = 'function ast() {}'
const ast = esprima.parse(code)

console.log(inspect(
  ast,
  false,
  100
), '\r\n')

estraverse.traverse(ast, {
  enter(node) {
    console.log('enter ', node.type)
    if (node.type === 'Identifier') {
      node.name += '_enter'
    }
  },
  leave(node) {
    console.log('leave ', node.type)
    if (node.type === 'Identifier') {
      node.name += '_leave'
    }
  }
})

const result = escodegen.generate(ast)

console.log('\r\n', result)
