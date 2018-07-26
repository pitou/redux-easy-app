import React from 'react';
import { match } from 'react-router';

import renderApp from './renderApp';
import createStore from '../createStore';
import prefetchData from './prefetchData';

export default (req, res, options) => {

    const { routes, reducers, initialState, routesFetchersMap, ignoredPathsRegex } = options;
    const onError = options.onError || (() => {});

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          onError(error);
          return res.status(200).end('');
        }
        if (redirectLocation) {
          return res.status(301).redirect(redirectLocation.pathname);
        }
        if (! renderProps) {
          return res.status(404).end('Not found'); // TODO: render 404 on client?
        }

        const store = createStore(reducers, initialState);

        prefetchData(routesFetchersMap, renderProps.location.pathname, req.query, ignoredPathsRegex, store)
            .then(() => renderApp(renderProps, store, options))
            .then(html => res.send(html))
            .catch(err => {
              onError(err);
              return res.status(200).end('');
            });
    });
}
