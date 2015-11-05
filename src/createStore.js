import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { reduxReactRouter as reduxReactRouterServer } from 'redux-router/server';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { createHistory, createMemoryHistory } from 'history'
//import loggerMiddleware from 'redux-logger';

export default function(reducers, initialState, routes) {

    const history = (typeof window !== 'undefined' && window.__CLIENT__) ? createHistory : createMemoryHistory;
    const router =  (typeof window !== 'undefined' && window.__CLIENT__) ? reduxReactRouter : reduxReactRouterServer;

    const reducersWithRouter = combineReducers(
        Object.assign({}, reducers, {
            router: routerStateReducer
        })
    );

    return compose(
        applyMiddleware(
            thunkMiddleware
            //, loggerMiddleware
        ),
        router({
            routes,
            createHistory: history
        })
    )(createStore)(reducersWithRouter, initialState);
}
