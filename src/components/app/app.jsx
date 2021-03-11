import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './app.css';
import Home from '../home-page/home-page';
import Results from '../results/results';
import {AppRoute} from '../../const';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={AppRoute.SOURCE}>
          <Results />
        </Route>
        <Route path={AppRoute.ROOT} exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
