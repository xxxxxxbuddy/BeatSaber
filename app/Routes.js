import React from 'react';
// import { Switch, Route, BrowserHistory, Router } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import routes from './constants/routes';
import App from './containers/App';
import Home from './components/Home';
import Admin from './components/Admin';

export default () => (
  <App>
    <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Home} />
    </Switch>
  </App>
);
