import React from 'react';
import { match } from 'redux-router/server';

import renderApp from './renderApp';
import createStore from '../createStore';

export default (req, res, options) => {

    const { routes, reducers, fetchInitialData } = options;

    const store = createStore(reducers, undefined, routes);

    console.log("Path: " + req.path);

    store.dispatch(match(req.path, (error, redirectLocation, renderProps) => {
        if (error) {
          console.log(error);
          return res.status(500).end('Internal server error');
        }
        if (redirectLocation) {
          return res.status(301).redirect(redirectLocation.pathname);
        }
        if (! renderProps) {
          return res.status(404).end('Not found'); // TODO: render 404 on client?
        }

        console.log("--> Preloading data");

        fetchInitialData(renderProps.location.pathname, store)
            .then(() => renderApp(routes, store, options))
            .then(html => res.send(html))
            .catch(err => res.send(`Error: ${err.message}`));
    }));
}
