import React from 'react';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import nunjucks from 'nunjucks';

import createApp from '../createApp';

export default function(routes, store, options) {

    const App = createApp(routes);

    const initialState = store.getState();

    const appString = ReactDOMServer.renderToString(
        <Provider store={store}>
            <App {...initialState} />
        </Provider>
    );

    nunjucks.configure(options.viewsFolderPath, { autoescape: true });

    return nunjucks.render(options.viewFilename, {
        appString,
        initialState: JSON.stringify(initialState),
        env: process.env
    });
}
