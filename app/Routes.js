import React from 'react';
// import { Switch, Route, BrowserHistory, Router } from 'react-router';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import routes from './constants/routes';
import App from './containers/App';
import Home from './components/Home';
import AdminPage from './components/Admin';

export default () => (
  <App>
    <BrowserRouter>
      <Switch>
        <Route path={routes.ADMIN} component={AdminPage} />
        <Route path={routes.HOME} component={Home} />
      </Switch>
    </BrowserRouter>
  </App>
);
