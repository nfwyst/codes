import Redux from '../redux'
import reducer from './reducers'
import promise from './middleware/redux-promise'
import thunk from './middleware/redux-thunk'
import logger from './middleware/redux-logger'
import { persistReducer, persistStore } from '../redux-persist'
import storage from '../redux-persist/lib/storage'

const { applyMiddleware, createStore } = Redux

const persistConfig = {
    key: 'root',
    storage
}
const rootReducer = persistReducer(persistConfig, reducer)
const store = applyMiddleware(promise, thunk, logger)(createStore)(rootReducer)
const persistor = persistStore(store)
export { store, persistor }
