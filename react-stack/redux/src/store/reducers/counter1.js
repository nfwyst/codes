import * as types from '../../action-types'
import { handleActions } from '../../redux-actions'

export default handleActions({
    [types.ADD1]: (state, action) => {
        return { number: state.number + 1 }
    },
    [types.MINUS1]: (state, action) => {
        return { number: state.number - 1 }
    }
}, { number: 0 })
