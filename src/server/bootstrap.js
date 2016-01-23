import React from 'react';
import { match } from 'react-router';

import renderApp from './renderApp';
import createStore from '../createStore';
import prefetchData from './prefetchData';

export default (req, res, options) => {

    const { routes, reducers, routesFetchersMap } = options;

    match({ routes, location: req.path }, (error, redirectLocation, renderProps) => {
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

        const store = createStore(reducers);

        prefetchData(routesFetchersMap, renderProps.location.pathname, store)
            .then(() => renderApp(renderProps, store, options))
            .then(html => res.send(html))
            .catch(err => res.send(`Error: ${err.stack}`));
    });
}
