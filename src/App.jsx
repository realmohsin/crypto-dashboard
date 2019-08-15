import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Global, css } from '@emotion/core'
import HomePage from './pages/HomePage'

class App extends React.Component {
  render () {
    return (
      <>
        <Global styles={globalStyles} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='*' render={() => <h2>Page Not Found</h2>} />
        </Switch>
      </>
    )
  }
}

const globalStyles = css`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
    font-size: 62.5%;
  }

  body {
    font-size: 2rem;
    color: white;
    font-family: 'Do Hyeon', sans-serif;
    background: #010e2c;
  }
`

export default App
