import React from 'react'
import actions from '../store/actions/counter1'
import { connect } from '../react-redux'
import { createSelector } from '../reselect'

class Counter1 extends React.Component {
    render() {
        console.log('counter1 重新渲染', this.props.number)
        const { number, ADD1, MINUS1 } = this.props
        return (
            <div>
                <p>{number}</p>
                <button onClick={ADD1}>+</button>
                <button onClick={MINUS1}>-</button>
            </div>
        )
    }
}

const getCounter1Selector = createSelector(
    state => state.counter1,
    a => a
)

export default connect(state => getCounter1Selector(state), actions)(Counter1)
