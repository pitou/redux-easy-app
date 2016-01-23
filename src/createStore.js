import { syncHistory, routeReducer } from 'redux-simple-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default function(reducers, initialState) {

    const reducer = combineReducers(Object.assign({}, reducers, {
        routing: routeReducer
    }));

    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

    return new createStoreWithMiddleware(reducer, initialState);
}
