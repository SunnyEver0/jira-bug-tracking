import './less/all.less';

import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import mock from './mock';
import { routes } from './routes';
import { homeStore, appListStore, appStore, teamStore } from './store';

mock.start();

const stores = {
  appStore,
  homeStore,
  appListStore,
  teamStore
};

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router>
          <Switch>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                render={props => <route.component {...props} routes={route.routes} />}
              />
            ))}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
