export default function(routesFetchersMap, path, store) {

    const decodedPath = decodeURI(path);
    console.log("Pre-fetcher --> Decoded path: " + decodedPath);

    for (let i = 0; i < routesFetchersMap.length; i++) {
        const m = routesFetchersMap[i].regex.exec(decodedPath);
        if (m !== null) {
            console.log(`Pre-fetcher --> Matched ${routesFetchersMap[i].name}`);
            return store.dispatch(routesFetchersMap[i].func(m));
        }
    }

    console.log(`Pre-fetcher --> No route matched, nothing to prefetch`);
    return Promise.resolve(true);
}
