import Token from './token';
import Lexer, { TokenType } from './Lexer';

interface IProps {
  token?: Token;
  identifier?: Identifier;
  expression?: Expression;
  value?: any;
  operator?: string;
}

abstract class PNode {
  tokenLiteral: string
  constructor(props: IProps) {
    this.tokenLiteral = ''
  }

  getLiteral(): string {
    return this.tokenLiteral
  }
}

class Statement extends PNode {
  statementNode(): Statement {
    return this
  }
}

class Expression extends PNode {
  constructor(props: IProps) {
    super(props)
    this.tokenLiteral = props.token.literal
  }

  expressionNode(): Expression {
    return this
  }
}

class Identifier extends Expression {
  token: Token
  value: string
  constructor(props: IProps) {
    super(props)
    this.tokenLiteral = props.token.literal
    this.token = props.token
    this.value = props.value || ''
  }
}

class IntegerLiteral extends Expression {
  token: Token
  value: number
  constructor(props: IProps) {
    super(props)
    this.token = props.token
    this.value = props.value
    this.tokenLiteral = `Integer value is: ${this.token.literal}`
  }
}

class PrefixExpression extends Expression {
  token: Token;
  operator: string;
  right: Expression;
  constructor(props: IProps) {
    super(props)
    this.token = props.token
    this.operator = props.operator
    this.right = props.expression
    this.tokenLiteral = `(${this.operator}${this.right.getLiteral()})`
  }
}

class LetStatement extends Statement {
  token: Token
  name: Identifier
  value: Expression
  constructor(props: IProps) {
    super(props)
    this.token = props.token
    this.name = props.identifier
    this.value = props.expression
    this.tokenLiteral = `this is a let statement, left is an identifier: ${this.name.getLiteral()}, right size is value of ${this.value.getLiteral()}`
  }
}

class ExpressionStatement extends Statement {
  token: Token
  expression: Expression
  constructor(props: IProps) {
    super(props)
    this.token = props.token
    this.expression = props.expression
    this.tokenLiteral = `expression: ${this.expression.getLiteral()}`
  }
}

class ReturnStatement extends Statement {
  token: Token
  expression: Expression
  constructor(props: IProps) {
    super(props)
    this.token = props.token
    this.expression = props.expression
    this.tokenLiteral = `return with ${props.expression.getLiteral()}`
  }
}

class Program {
  statements: Statement[]
  constructor() {
    this.statements = []
  }

  getLiteral() {
    if (this.statements.length) {
      return this.statements[0].tokenLiteral
    }
    return ''
  }
}

class Parser {
  lexer: Lexer
  tokenPos: number
  curToken: Token
  peekToken: Token
  program: Program
  tokens: Token[]
  LOWEST: number
  EQUALS: number
  LESSGREATER: number
  SUM: number
  PRODUCT: number
  PREFIX: number
  CALL: number
  prefixParseFns: { [key: string]: Function }
  constructor(lexer: Lexer) {
    this.lexer = lexer
    this.tokens = this.lexer.lexe()
    this.tokenPos = 0 // 当前正在处理的 token 的位置
    this.curToken = null // 当前指向的 token
    this.peekToken = null // 当前所指向的 token 的下一个 token
    this.nextToken()
    this.nextToken()
    this.program = new Program()
    // 常量设置用来表示运算符的优先级
    this.LOWEST = 0
    this.EQUALS = 1
    this.LESSGREATER = 2
    this.SUM = 3
    this.PRODUCT = 4
    this.PREFIX = 5
    this.CALL = 6

    this.prefixParseFns = {
      [TokenType.IDENTIFIER]: this.parseIdentifier,
      [TokenType.INTEGER]: this.parseIntegerLiteral,
      [TokenType.BANG_SIGN]: this.parsePrefixExpression,
    }
  }

  parseIdentifier(caller: Parser): Expression {
    return caller.createIdentifier()
  }

  parseIntegerLiteral(caller: Parser): Expression {
    return caller.createIntegerLiteral()
  }

  parsePrefixExpression(caller: Parser) {
    const token = caller.curToken
    const operator = token.literal
    caller.nextToken()
    const expression = caller.parseExpression(caller.PREFIX)
    return new PrefixExpression({ token, operator, expression })
  }

  createIdentifier(): Identifier {
    return new Identifier({
      token: this.curToken,
      value: this.curToken.literal
    })
  }

  createIntegerLiteral(): IntegerLiteral {
    let value = parseInt(this.curToken.literal)
    if (isNaN(value)) {
      console.log('could not parse token as integer')
      return null
    }
    return new IntegerLiteral({
      token: this.curToken,
      value
    })
  }

  nextToken(): void {
    this.curToken = this.peekToken
    this.peekToken = this.tokens[this.tokenPos++]
  }

  parseProgram(): Program {
    while (this.curToken.type !== TokenType.EOF) {
      const stmt = this.parseStatement()
      if (stmt) this.program.statements.push(stmt)
      this.nextToken()
    }
    return this.program
  }

  parseStatement(): Statement {
    switch (this.curToken.type) {
      case TokenType.LET:
        return this.parseLetStatement()
      case TokenType.RETURN:
        return this.parseReturnStatement()
      default:
        return this.parseExpressionStatement()
    }
  }

  parseExpressionStatement(): Statement {
    var stmt = new ExpressionStatement({
      token: this.curToken,
      expression: this.parseExpression(this.LOWEST)
    })
    if (this.peekTokenIs(TokenType.SEMICOLON)) {
      this.nextToken()
    }

    return stmt
  }

  parseExpression(precedence: number): Expression {
    const prefix = this.prefixParseFns[this.curToken.type]
    if (prefix === null) {
      console.log(`no parsing function found for token: ${this.curToken.literal}`)
      return null
    }
    return prefix(this)
  }

  parseLetStatement(): LetStatement {
    const props: IProps = {}
    props.token = this.curToken
    if (!this.expectPeek(TokenType.IDENTIFIER)) {
      return null
    }
    props.identifier = new Identifier({
      token: this.curToken,
      value: this.curToken.literal
    })
    if (!this.expectPeek(TokenType.ASSIGN_SIGN)) {
      return null
    }
    if (!this.expectPeek(TokenType.INTEGER)) {
      return null
    }
    props.expression = new Expression({
      token: this.curToken
    })
    if (!this.expectPeek(TokenType.SEMICOLON)) {
      return null
    }
    return new LetStatement(props)
  }

  parseReturnStatement(): ReturnStatement {
    const props: IProps = {}
    props.token = this.curToken

    if (!this.expectPeek(TokenType.INTEGER)) {
      return null
    }

    props.expression = new Expression({
      token: this.curToken
    })

    if (!this.expectPeek(TokenType.SEMICOLON)) {
      return null
    }

    return new ReturnStatement(props)
  }

  peekTokenIs(type: TokenType): boolean {
    return this.peekToken.type === type
  }

  curTokenIs(type: TokenType): boolean {
    return this.curToken.type === type
  }

  expectPeek(type: TokenType): boolean {
    if (this.peekTokenIs(type)) {
      this.nextToken()
      return true
    }
    return false
  }
}

export default Parser
