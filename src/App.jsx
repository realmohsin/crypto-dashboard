import React from 'react'
import pull from 'lodash/pull'
import includes from 'lodash/includes'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Global, css } from '@emotion/core'
import cc from 'cryptocompare'
import SettingsPage from './pages/SettingsPage'
import Navbar from './components/Navbar'
import DashboardPage from './pages/DashboardPage'
import AppLayout from './components/AppLayout'
import appContext from './appContext'

const MAX_FAVORITES = 10

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      confirmFavorites: this.confirmFavorites,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      ...this.getSavedSettings()
    }
  }

  componentDidMount () {
    this.fetchCoins()
  }

  fetchCoins = async () => {
    const coinList = (await cc.coinList()).Data
    this.setState({ coinList })
  }

  addCoin = key => {
    const favorites = [...this.state.favorites]
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key)
      this.setState({ favorites })
    }
  }

  removeCoin = key => {
    const favorites = [...this.state.favorites]
    this.setState({ favorites: pull(favorites, key) })
  }

  isInFavorites = key => includes(this.state.favorites, key)

  getSavedSettings () {
    const cryptoBoardData = JSON.parse(localStorage.getItem('cryptoBoard'))
    if (!cryptoBoardData) {
      return { firstVisit: true }
    }
    const favorites = cryptoBoardData.favorites
    return { firstVisit: false, favorites }
  }

  confirmFavorites = () => {
    localStorage.setItem(
      'cryptoBoard',
      JSON.stringify({
        favorites: this.state.favorites
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
