import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { createRouter } from './config/router';

import './style/style.scss';

let configureStore;

if (DEV) {
  configureStore = require('./config/configureStore.dev').default;
} else {
  configureStore = require('./config/configureStore.prod').default;
}

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const store = configureStore(history, {});

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    { createRouter(history) }
  </Provider>,
  document.getElementById('root'),
);
