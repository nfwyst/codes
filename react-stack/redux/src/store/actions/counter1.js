import * as types from '../../action-types'
import { createActions } from '../../redux-actions'

export default createActions({
    [types.ADD1]: count => count,
    [types.MINUS1]: count => count,
})
