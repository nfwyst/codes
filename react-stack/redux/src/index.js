import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './react-redux'
import { store, persistor } from './store'
import { PersistGate } from './redux-persist/integration/react'

import Counter1 from './components/counter1'
import Counter2 from './components/counter2'


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Counter2 />
      <Counter1 />
    </PersistGate>
  </Provider>
  , document.getElementById('root'))
