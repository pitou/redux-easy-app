import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { Router } from 'react-router';
import history from './history';

export default function(routes) {

    return class extends Component {
        render() {
            return (
                <Router history={history}>
                    {routes}
                </Router>
            );
        }
    }
}
