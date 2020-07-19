import React from 'react'
import actions from '../store/actions/counter2'
import { connect } from '../react-redux'
import { createSelector } from '../reselect'

class Counter2 extends React.Component {
    render() {
        console.log('counter2 重新渲染', this.props.number)
        const { number, add, minus } = this.props
        return (
            <div>
                <p>{number}</p>
                <button onClick={add}>+</button>
                <button onClick={minus}>-</button>
            </div>
        )
    }
}

const getCounter2Selector = createSelector(
    state => state.counter2,
    a => a
)

export default connect(
    state => getCounter2Selector(state),
    actions
)(Counter2)
