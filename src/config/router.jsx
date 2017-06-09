import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import LoginContainer from '../containers/LoginContainer';
import AppContainer from '../containers/AppContainer';

export const createRouter = (history) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={AppContainer}/>
        <Route path="/login" component={LoginContainer}/>
      </div>
    </ConnectedRouter>
  )
};
