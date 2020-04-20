/**
 * @fileoverview 前端帮助函数
 * @author nfwyst@gmail.com
 */

function helper() { }

helper._version = 0.1

/**
 * 防抖函数
 * @param {function} fn 需要被防抖包装的函数
 * @param {number} wait 防抖需要等待的时间
 * @return {function}
 */
helper.debounce = function (fn, wait) {
  var timer
  return function () {
    clearTimeout(timer)
    const context = this
    const args = arguments
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}
