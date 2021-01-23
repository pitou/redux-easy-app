import bootstrap from './bootstrap'

export default function (expressApp, options) {
  expressApp.use((req, res) => {
    return bootstrap(req, res, options)
  })

  let server
  server = expressApp.listen(options.port || 3000, function () {
    const host = server.address().address
    const port = server.address().port

    console.log('App listening at http://%s:%s', host, port)
  })
}
