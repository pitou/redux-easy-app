import React from 'react';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import nunjucks from 'nunjucks';

export default function(renderProps, store, options) {

    const initialState = store.getState();

    const appString = ReactDOMServer.renderToString(
        <Provider store={store}>
            <RoutingContext {...renderProps} />
        </Provider>
    );

    nunjucks.configure(options.viewsFolderPath, { autoescape: true });

    return nunjucks.render(options.viewFilename, {
        appString,
        initialState: JSON.stringify(initialState),
        env: process.env
    });
}
