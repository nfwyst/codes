const babel = require('babel-core')
const types = require('babel-types')

let code = `let sum = (a, b) => a + b`

const result = babel.transform(code, {
  plugins: [
    {
      visitor: {
        ArrowFunctionExpression: path => {
          const { params } = path.node
          const blockStatement = types.blockStatement([
            types.returnStatement(path.node.body)
          ])
          const newFunc = types.functionExpression(null, params, blockStatement, false, false)
          path.replaceWith(newFunc)
        }
      }
    }
  ]
})

console.log(result.code)
