import React from 'react'
import ReactReduxContext from './context'
import Redux from '../redux'

const { bindActionCreators } = Redux

export default (mapStateToProps, actions) => {
    return (WrappedComponent) => {
        return class extends React.Component {
            static contextType = ReactReduxContext;

            constructor(props, context) {
                super(props)
                this.state = mapStateToProps(context.store.getState())
                if(typeof actions == 'function') {
                    this.boundActions = actions(context.store.dispatch, props)
                } else {
                    this.boundActions = bindActionCreators(actions, context.store.dispatch)
                }
            }

            componentDidMount() {
                this.unsubscribe = this.context.store.subscribe(() => {
                    this.setState(mapStateToProps(this.context.store.getState()))
                })
            }

            componentWillUnmount() {
                this.unsubscribe()
            }

            render() {
                return <WrappedComponent {...this.state} {...this.boundActions} />
            }
        }
    }
}
