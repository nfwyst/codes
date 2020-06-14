import Token from './token';

/**
 * @fileoverview 词法解析器
 * @author nfwyst
 */

// token 的类别
export enum TokenType {
  ILLEGAL = -2,
  EOF = -1,
  LET = 0,
  IDENTIFIER = 1,
  ASSIGN_SIGN = 2,
  PLUS_SIGN = 3,
  INTEGER = 4,
  SEMICOLON = 5,
  IF = 6,
  ELSE = 7,
  MUL = 8,
  RETURN = 9,
  BANG_SIGN = 10,
  MINUS_SIGN = 11
}

class Lexer {
  private readPosition: number; // 当前读取的位置
  private lineCount: number; // 当前的行号
  private ch: string | number; // 当前读取的字符
  private readonly ILLEGAL = TokenType.ILLEGAL;
  private readonly EOF = TokenType.EOF;
  private readonly LET = TokenType.LET;
  private readonly IDENTIFIER = TokenType.IDENTIFIER;
  private readonly ASSIGN_SIGN = TokenType.ASSIGN_SIGN;
  private readonly PLUS_SIGN = TokenType.PLUS_SIGN;
  private readonly INTEGER = TokenType.INTEGER;
  private readonly SEMICOLON = TokenType.SEMICOLON;
  private readonly IF = TokenType.IF;
  private readonly ELSE = TokenType.ELSE;
  private readonly RETURN = TokenType.RETURN;
  private keyWordMap = {};
  private MUL = TokenType.MUL;
  constructor(
    private sourceCode: string
  ) {
    this.readPosition = 0
    this.lineCount = 1
    this.ch = ''
    this.initKeyWord()
  }

  /**
   * 初始化关键字
   */
  initKeyWord() {
    this.keyWordMap['let'] = (n: number) => new Token(this.LET, 'let', n)
    this.keyWordMap['if'] = (n: number) => new Token(this.IF, 'if', n)
    this.keyWordMap['else'] = (n: number) => new Token(this.ELSE, 'else', n)
    this.keyWordMap['return'] = (n: number) => new Token(this.RETURN, 'return', n)
  }

  /**
   * 读取 token 直到读取到文件末尾
   * @returns {Token[]}
   */
  lexe(): Token[] {
    const tokens = []
    let token = this.nextToken()
    while (token.type !== this.EOF) {
      tokens.push(token)
      token = this.nextToken()
    }
    tokens.push(token)
    return tokens
  }

  /**
   * 读取一个字符并更新读取的位置
   */
  readChar(): void {
    if (this.readPosition >= this.sourceCode.length) {
      this.ch = 0
    } else {
      this.ch = this.sourceCode[this.readPosition++]
    }
  }

  /**
   * 读取下一个 token, 忽略空白和换行
   */
  nextToken(): Token {
    this.readChar()
    this.skipWhiteSpaceAndNewLine()
    let token = undefined
    switch (this.ch) {
      case '+':
        token = new Token(this.PLUS_SIGN, '+', this.lineCount)
        break
      case ';':
        token = new Token(this.SEMICOLON, ';', this.lineCount)
        break
      case '=':
        token = new Token(this.ASSIGN_SIGN, '=', this.lineCount)
        break
      case 0:
        token = new Token(this.EOF, '', this.lineCount)
        break
      case '*':
        token = new Token(this.MUL, '*', this.lineCount)
        break
      default:
        let res = this.readIdentifier()
        if (res !== false) {
          if (this.keyWordMap[res as string]) {
            token = this.keyWordMap[res as string](this.lineCount)
          } else {
            token = new Token(this.IDENTIFIER, res as string, this.lineCount)
          }
        } else {
          res = this.readNumber()
          if (res !== false) {
            token = new Token(this.INTEGER, res as string, this.lineCount)
          } else {
            token = new Token(this.ILLEGAL, '', this.lineCount)
          }
        }
    }
    return token
  }

  /**
   * 跳过空白和换行
   */
  skipWhiteSpaceAndNewLine(): void {
    while (this.ch === ' ' || this.ch === '\t' || this.ch === '\n') {
      if (this.ch === '\t' || this.ch === '\n') this.lineCount++
      this.readChar()
    }
  }

  /**
   * 判断输入是否为数字
   */
  isNumber(a: string | number): boolean {
    return a >= '0' && a <= '9'
  }

  /**
   * 读取数字
   */
  readNumber(): string | boolean {
    let num = ''
    while (this.isNumber(this.ch)) {
      num += this.ch
      this.readChar()
    }
    if (num.length) {
      !this.isNumber(this.ch) && this.unShiftChar()
      return num
    }
    return false
  }

  /**
   * 读取标识符
   */
  readIdentifier(): string | boolean {
    let identifier = ''
    while (this.isIdentifier(this.ch)) {
      identifier += this.ch
      this.readChar()
    }
    if (identifier.length) {
      !this.isIdentifier(this.ch) && this.unShiftChar()
      return identifier
    }
    return false
  }

  /**
   * 判断输入是否是标识符
   */
  isIdentifier(a: string | number): boolean {
    return a >= 'a' && a <= 'z' || a >= 'A' && a <= 'Z' || a === '_'
  }

  /**
   * 回退一个读取的字符
   */
  unShiftChar() {
    if (this.readPosition >= 1 && this.readPosition <= this.sourceCode.length) {
      this.ch = this.sourceCode[this.readPosition--]
    }
  }
}

export default Lexer
