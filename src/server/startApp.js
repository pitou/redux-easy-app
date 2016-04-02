import 'babel-polyfill';
import bootstrap from './bootstrap';

export default function(expressApp, options) {

    expressApp.use((req, res) => {
        return bootstrap(req, res, options);
    });

    let server;
    server = expressApp.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('App listening at http://%s:%s', host, port);
    });
}
