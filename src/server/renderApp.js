import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { RouterContext } from 'react-router';
import nunjucks from 'nunjucks';

export default function(renderProps, store, options) {

    const initialState = store.getState();

    const appString = ReactDOMServer.renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>
    );

    nunjucks.configure(options.viewsFolderPath, { autoescape: true });

    return nunjucks.render(options.viewFilename, {
        ...(options.customViewValues || {}),
        appString,
        initialState: JSON.stringify(initialState),
        env: process.env,
    });
}
