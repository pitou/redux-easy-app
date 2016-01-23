import 'babel/polyfill';
import React from 'react';  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

export default function(options) {

    const { reducers, routes, appRootElement } = options;

    window.__CLIENT__ = true;
    window.__SERVER__ = false;

    const createStore = require('../createStore');
    const createApp = require('../createApp');

    const state = window.__initialState;
    const store = createStore(reducers, state);
    const App = createApp(routes);

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        appRootElement
    );
}
