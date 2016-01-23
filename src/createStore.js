import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { reduxReactRouter as reduxReactRouterServer } from 'redux-router/server';
import thunkMiddleware from 'redux-thunk';
import { routeReducer } from 'redux-simple-router'
//import loggerMiddleware from 'redux-logger';

export default function(reducers, initialState, routes) {

    const reducer = combineReducers(
        Object.assign({}, reducers, {
            routing: routeReducer
        })
    );

    // Required for replaying actions from devtools to work
    //reduxRouterMiddleware.listenForReplays(store)

    return compose(
        applyMiddleware(
            thunkMiddleware
            //, loggerMiddleware
        ),
        router({
            routes,
        })
    )(createStore)(reducer, initialState);
}
