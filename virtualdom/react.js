function createElement(type, config, ...childrens) {
  config = config || {}
  const props = { ...config }
  const { length } = childrens
  if (length === 1) {
    props.children = childrens[0]
  } else if (length > 1) {
    props.children = childrens
  }
  return { type, props }
}

class Component {
  static isReactComponent = true

  constructor (props) {
    this.props = props
    this.props.children = this.props.children || {}
  }
}

export default { createElement, Component }
