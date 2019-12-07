import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import App from './App'

export const history = createBrowserHistory()

const app = (
  <Router history={history}>
    <App />
  </Router>
)

render(app, document.getElementById('root'))
