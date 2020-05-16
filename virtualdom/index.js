import ReactDOM from './react-dom.js'
import React from './react'

const Welcome = props => {
  return React.createElement('h1', {
    id: 'welcome'
  }, props.name, props.age)
}

class Welcome1 extends React.Component {
  render() {
    return React.createElement('h1', { id: 'welcome' }, this.props.name, this.props.age, this.props.children)
  }
}

const element1 = React.createElement(
  Welcome,
  { name: 'marvin', age: 26 }
)

const element = React.createElement(
  Welcome1,
  { name: 'hello world', age: 100 },
  element1
)


ReactDOM.render(element, document.getElementById('root'))
