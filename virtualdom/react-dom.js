function render(element, parentNode) {
  if (typeof element === 'string' || typeof element === 'number') {
    return parentNode.appendChild(document.createTextNode(element))
  }
  let { type, props } = element
  if (!Object.keys(element).length) return true
  if (type.isReactComponent) {
    const returnElement = new type(props).render()
    type = returnElement.type
    props = returnElement.props
  } else if (typeof type === 'function') {
    const returnElement = type(props)
    type = returnElement.type
    props = returnElement.props
  }
  const domElement = document.createElement(type)
  for (const [key, value] of Object.entries(props)) {
    if (key === 'className') {
      domElement.className = value
    } else if (key === 'style') {
      for (const [styleKey, styleValue] of Object.entries(value)) {
        domElement.style[styleKey] = styleValue
      }
    } else if (key === 'children' && value) {
      const children = Array.isArray(value) ? value : [value]
      children.forEach(child => render(child, domElement))
    } else {
      domElement.setAttribute(key, value)
    }
  }
  parentNode.appendChild(domElement)
}

export default { render }
