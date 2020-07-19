import counter1 from './counter1'
import counter2 from './counter2'
import Redux from '../../redux'

const { combineReducers } = Redux

export default combineReducers({
    counter1,
    counter2
})

