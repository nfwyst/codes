import React from 'react';
import Add from './components/Add'
import List from './components/List'
import store from './store'
import { Provider } from 'react-redux'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Add />
        <List />
      </Provider>
    )
  }
}

export default App
