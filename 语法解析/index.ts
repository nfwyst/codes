import Lexer from './Lexer'
import Parser from './Parser'

// const lexer = new Lexer('let x = 1212;\n let y = 2;return 12;')
const lexer = new Lexer('1234;')
const parser = new Parser(lexer)

parser.parseProgram()
console.log(parser.tokens)
console.log(parser.program.statements)
