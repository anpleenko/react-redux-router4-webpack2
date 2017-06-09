import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { admin } from './admin';

const rootReducer = combineReducers({
  router,
  admin,
});

export default rootReducer;
