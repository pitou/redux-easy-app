redux-easy-app
==============

This library can help you reduce the boilerplate of a **Redux isomorphic app** to the minimum.

Installation
------------

You can install the package using:

    npm install redux-easy-app

However, if you are starting to write an app from scratch, you may consider downloading the
[redux-app-skeleton](https://github.com/pitou/redux-app-skeleton), which depends on this module and
already uses the functions explained in the following section.

Redux'(s?) function wrappers
----------------------------

*redux-easy-app* exposes only three functions:

**createContainer()**

Binds a component to his props and actions.

You may want use this one on every component that interacts in any way with the state of the application.

    createContainer(ExampleComponent, SomeActions, mapStateToProps);

**renderClientApp()**

Renders the app in the browser, given its routes and reducers.

    renderClientApp({
        routes,
        reducers,
        appRootElement
    });

**startServerApp()**

This one needs a larger number of options but takes care of a lot of things: isomorphism, data pre-fetch,
state push into the tree of routes.

You have to provide an instance of an Express app as first argument. The **request** object will be internally
used to decide which route has been requested and fetch the data accordingly, the **response** object will
be used to send the rendered HTML.

The *viewFilename* option refers to a [nunjucks](https://www.npmjs.com/package/nunjucks) template file, usually the index.html of your app.
In the future, other template engines will be supported too.

    startServerApp(app, {
        routes,
        reducers,
        routesFetchersMap,
        viewsFolderPath,
        viewFilename
    });

The option *routesFetchersMap* should be an array of objects having the format specified in
[this example](https://github.com/pitou/redux-app-skeleton/blob/master/src/server/routesFetchersMap.js).

Given a certain route, the server app will call the function that you specified as the *func* parameter
and then the page will be rendered with the fetched data.
