import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <ul>
          {
            this.props.lists.map(item => (<li key={item}>{item}</li>))
          }
        </ul>
      </div>
    )
  }
}
