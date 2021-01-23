import React from 'react'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import { RouterContext } from 'react-router'
import nunjucks from 'nunjucks'

export default function (renderProps, store, options) {
  const initialState = store.getState()

  const appString = ReactDOMServer.renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  )

  nunjucks.configure(options.viewsFolderPath, { autoescape: true })

  const customViewValues = Object.keys(options.customViewValues || {}).reduce(
    (acc, key) => {
      const valueOrFunction = options.customViewValues[key]
      return {
        ...acc,
        [key]:
          typeof valueOrFunction === 'function'
            ? valueOrFunction(initialState, renderProps)
            : valueOrFunction,
      }
    },
    {}
  )

  return nunjucks.render(options.viewFilename, {
    ...customViewValues,
    appString,
    initialState: JSON.stringify(initialState),
    env: process.env,
  })
}
