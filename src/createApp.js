import React from 'react'
import { Router } from 'react-router'

import history from './history'

const RouterWrapper = (routes) => {
  return <Router history={history}>{routes}</Router>
}

export default RouterWrapper
