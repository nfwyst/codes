/**
 * some basic utils for canvas
 */

class CanvasUtil {
  constructor () {
    this.getOffset = this.getOffset.bind(this)
    this.eventWrapper = this.eventWrapper.bind(this)
    this.toRad = this.toRad.bind(this)
    this.toAngle = this.toAngle.bind(this)
  }

  /**
   * @param {Element} dom element
   * @return {object} {x,y} 鼠标在元素上的坐标
   */
  getOffset(ele) {
    let mouse = { x: 0, y: 0 }
    ele.addEventListener('mousemove', (e) => {
      let { x, y } = this.eventWrapper(e)
      Object.assign(mouse, { x, y })
    })
    return mouse
  }

  eventWrapper(ev) {
    const { pageX, pageY, target } = ev
    let { left, top } = target.getBoundingClientRect()
    return { x: pageX - left, y: pageY - top }
  }

  /**
   * 角度转弧度
   * @param {number} angle 角度
   * @return {number} 弧度
   */
  toRad(angle) {
    return angle * Math.PI / 180
  }

  /**
   * 弧度转角度
   * @param {number} rad 弧度
   * @return {number} 角度
   */
  toAngle(rad) {
    return rad * 180 / Math.PI
  }
}
