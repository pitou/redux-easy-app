import { routeReducer as router } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default (reducers, initialState) => {

  const reducer = combineReducers({
    router,
    ...reducers,
  });

  const middleware = applyMiddleware(thunk);
  return createStore(reducer, initialState, middleware);
};
