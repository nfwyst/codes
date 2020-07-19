import React from 'react'
import ReactReduxContext from './context'

export default class Provider extends React.Component {
    render() {
        return (
            <ReactReduxContext.Provider value={{ store: this.props.store }}>
                {this.props.children}
            </ReactReduxContext.Provider>
        )
    }
}
