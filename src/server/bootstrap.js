import { match } from 'react-router'
import crypto from 'crypto'
import fs from 'fs'

import renderApp from './renderApp'
import createStore from '../createStore'
import prefetchData from './prefetchData'

export default (req, res, options) => {
  const {
    routes,
    reducers,
    initialState,
    routesFetchersMap,
    ignoredPathsRegex,
  } = options
  const onError = options.onError || (() => {})
  const log =
    options.customLog ||
    ((message) => {
      console.log(message)
    })

  match(
    { routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        onError(error)
        return res.status(200).end('')
      }
      if (redirectLocation) {
        return res.status(301).redirect(redirectLocation.pathname)
      }
      if (!renderProps) {
        return res.status(404).end('Not found') // TODO: render 404 on client?
      }

      const shouldUseCache = Boolean(options.cachePath)
      let cachedPagePath

      if (shouldUseCache) {
        const filename = crypto.createHash('md5').update(req.url).digest('hex')
        cachedPagePath = `${options.cachePath}/${filename}.html`

        if (fs.existsSync(cachedPagePath)) {
          const html = fs.readFileSync(cachedPagePath)
          return res.send(html)
        }
      }

      const store = createStore(reducers, initialState)
      const prefetcherOptions = { ignoredPathsRegex, log }

      prefetchData(
        routesFetchersMap,
        renderProps.location.pathname,
        req.query,
        prefetcherOptions,
        store
      )
        .then(() => renderApp(renderProps, store, options))
        .then((html) => {
          if (shouldUseCache) {
            fs.writeFileSync(cachedPagePath, html)
          }
          return res.send(html)
        })
        .catch((err) => {
          onError(err)
          return res.status(200).end('')
        })
    }
  )
}
