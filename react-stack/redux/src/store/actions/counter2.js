import * as types from '../../action-types'

let add = () => {
    return { type: types.ADD2 }
}

let minus = () => {
    return { type: types.MINUS2 }
}

export default {
    add,
    minus
}
