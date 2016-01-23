import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { Router } from 'react-router';

export default function(routes) {

    return class extends Component {
        render() {
            const history = require('./history');

            return (
                <Router history={history}>
                    {routes}
                </Router>
            );
        }
    }
}
