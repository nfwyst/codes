import React from 'react';
import {
  Route, Switch, BrowserRouter as Router, Redirect
} from 'react-router-dom';
import List from './pages/list';
import Detail from './pages/detail';
import Card from './pages/card';
import { NavBars } from './components/navbar'

function App() {
  return (
    <Router>
      <NavBars />
      <Switch>
        <Route exact path="/">
          <Redirect to="/list" />
        </Route>
        <Route exact path="/list">
          <List />
        </Route>
        <Route exact path="/detail/:id">
          <Detail />
        </Route>
        <Route exact path="/card">
          <Card />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
