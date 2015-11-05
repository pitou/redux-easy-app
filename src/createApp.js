import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { ReduxRouter } from 'redux-router';

export default function(routes) {

    return class extends Component {
        render() {
            return (
                <ReduxRouter {...this.props}>
                    {routes}
                </ReduxRouter>
            );
        }
    }
}
