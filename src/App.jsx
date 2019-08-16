import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Global, css } from '@emotion/core'
import cc from 'cryptocompare'
import SettingsPage from './pages/SettingsPage'
import Navbar from './components/Navbar'
import DashboardPage from './pages/DashboardPage'
import AppLayout from './components/AppLayout'
import appContext from './appContext'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.getSavedSettings(),
      confirmFavorites: this.confirmFavorites
    }
  }

  componentDidMount () {
    this.fetchCoins()
  }

  fetchCoins = async () => {
    const coinList = (await cc.coinList()).Data
    this.setState({ coinList })
  }

  getSavedSettings () {
    const cryptoBoardData = JSON.parse(localStorage.getItem('cryptoBoard'))
    if (!cryptoBoardData) {
      return { firstVisit: true }
    }
    return { firstVisit: false }
  }

  confirmFavorites = () => {
    localStorage.setItem(
      'cryptoBoard',
      JSON.stringify({
        test: 'hello'
      })
    )
    this.setState({
      firstVisit: false
    })
  }

  render () {
    const { firstVisit, coinList } = this.state
    const rootRedirectPath = firstVisit ? '/settings' : '/dashboard'
    return (
      <appContext.Provider value={this.state}>
        <Global styles={globalStyles} />
        <AppLayout>
          <Navbar />
          {coinList ? (
            <Switch>
              <Route exact path='/' render={() => <Redirect to={rootRedirectPath} />} />
              <Route path='/dashboard' component={DashboardPage} />
              <Route path='/settings' component={SettingsPage} />
              <Route path='*' render={() => <h2>Page Not Found</h2>} />
            </Switch>
          ) : (
            <div>Loading Coins</div>
          )}
        </AppLayout>
      </appContext.Provider>
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

  a {
    text-decoration: none;
    color: inherit;
  }
`

export default App
