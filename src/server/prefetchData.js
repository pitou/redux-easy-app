/* global Promise */

export default (routesFetchersMap, path, query, options, store) => {
  const { ignoredPathsRegex, log } = options
  const decodedPath = decodeURI(path)

  if (ignoredPathsRegex && ignoredPathsRegex.test(decodedPath)) {
    return Promise.resolve(true)
  }

  log(
    `Pre-fetcher --> Decoded path: ${decodedPath}, query: ${JSON.stringify(
      query
    )}`
  )

  const promises = []

  for (let i = 0; i < routesFetchersMap.length; i++) {
    const { regex, name, getActions } = routesFetchersMap[i]

    const m = regex.exec(decodedPath)
    if (m !== null) {
      log(`Pre-fetcher --> Matched ${name}`)

      let actions = getActions(m, query, decodedPath)
      actions = actions instanceof Array ? actions : [actions]
      actions.forEach((action) => {
        promises.push(store.dispatch(action))
      })
    }
  }
  if (promises.length > 0) {
    return Promise.all(promises)
  }

  log(`Pre-fetcher --> No route matched, nothing to prefetch`)
  return Promise.resolve(true)
}
