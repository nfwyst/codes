/**
 * @fileoverview Token 结构
 * @author nfwyst
 */

/**
 * @member _type token 类型
 * @member _literal token 字面量
 * @member _lineNumber token 所处的行号
 */
class Token {
    constructor(
        private _type: number,
        private _literal: string,
        private _lineNumber: number
    ) { }

    get type() { return this._type }
    get literal() { return this._literal }
    get lineNumber() { return this._lineNumber }
}

export default Token
