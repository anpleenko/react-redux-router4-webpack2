import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const configureStore = (history, initialState = {}) => {
  const enhancer = compose(
    applyMiddleware(
      routerMiddleware(history),
    ),
    window.devToolsExtension(),
  );

  // Add the reducer to your store on the `router` key
  // Also apply our middleware for navigating
  const store = createStore(
    rootReducer,
    initialState,
    enhancer,
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
};

export default configureStore;
