import React from 'react'

class PersistGate extends React.Component {
  componentDidMount() {
    this.props.persistor.initialize()
  }

  render() {
    return this.props.children
  }
}

export { PersistGate }
