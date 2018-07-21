export default function(routesFetchersMap, path, query, ignoredPathsRegex, store) {

    const decodedPath = decodeURI(path);

    if (ignoredPathsRegex && ignoredPathsRegex.test(decodedPath)) {
      return Promise.resolve(true);
    }

    console.log(`Pre-fetcher --> Decoded path: ${decodedPath}, query: ${JSON.stringify(query)}`);

    const promises = [];

    for (let i = 0; i < routesFetchersMap.length; i++) {
        const { regex, name, func } = routesFetchersMap[i];

        const m = regex.exec(decodedPath);
        if (m !== null) {
            console.log(`Pre-fetcher --> Matched ${name}`);

            let actions = func(m, query);
            actions = (actions instanceof Array) ? actions : [actions];
            actions.forEach(action => { promises.push(store.dispatch(action)); });
        }
    }
    if (promises.length > 0) {
      return Promise.all(promises);
    }

    console.log(`Pre-fetcher --> No route matched, nothing to prefetch`);
    return Promise.resolve(true);
}
