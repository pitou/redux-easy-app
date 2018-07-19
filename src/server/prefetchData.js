export default function(routesFetchersMap, path, store) {

    const decodedPath = decodeURI(path);
    console.log("Pre-fetcher --> Decoded path: " + decodedPath);

    const promises = [];

    for (let i = 0; i < routesFetchersMap.length; i++) {
        const { regex, name, func } = routesFetchersMap[i];

        const m = regex.exec(decodedPath);
        if (m !== null) {
            console.log(`Pre-fetcher --> Matched ${name}`);
            promises.push(store.dispatch(func(m)));
        }
    }
    if (promises.length > 0) {
      return Promise.all(promises);
    }

    console.log(`Pre-fetcher --> No route matched, nothing to prefetch`);
    return Promise.resolve(true);
}
