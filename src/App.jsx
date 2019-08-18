import React from 'react'
import pull from 'lodash/pull'
import includes from 'lodash/includes'
import subMonths from 'date-fns/sub_months'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Global, css } from '@emotion/core'
import cc from 'cryptocompare'
import SettingsPage from './pages/SettingsPage'
import Navbar from './components/Navbar'
import DashboardPage from './pages/DashboardPage'
import AppLayout from './components/AppLayout'
import appContext from './appContext'

const MAX_FAVORITES = 10
const TIME_UNITS = 10

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      confirmFavorites: this.confirmFavorites,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      setFilteredCoins: this.setFilteredCoins,
      setMainFavorite: this.setMainFavorite,
      ...this.getSavedSettings()
    }
  }

  componentDidMount () {
    this.fetchCoins()
    this.fetchPrices()
    this.fetchHistorical()
  }

  fetchHistorical = async () => {
    if (this.state.firstVisit) return
    const today = new Date()
    const results = await this.historical(today)
    console.log('results: ', results)
    const historicalPrices = [
      {
        name: this.state.mainFavorite,
        data: results.map((priceObj, index) => [
          subMonths(today, TIME_UNITS - index).valueOf(),
          priceObj.USD
        ])
      }
    ]
    console.log('historicalPrices: ', historicalPrices)
    this.setState({ historicalPrices })
  }

  historical = today => {
    const promises = []
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(this.state.mainFavorite, ['USD'], subMonths(today, units))
      )
    }
    return Promise.all(promises)
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

  setFilteredCoins = filteredCoins => this.setState({ filteredCoins })

  getSavedSettings () {
    const cryptoBoardData = JSON.parse(localStorage.getItem('cryptoBoard'))
    if (!cryptoBoardData) {
      return { firstVisit: true }
    }
    const { favorites, mainFavorite } = cryptoBoardData
    return { firstVisit: false, favorites, mainFavorite }
  }

  confirmFavorites = () => {
    const mainFavorite = this.state.favorites[0]
    this.setState(
      {
        firstVisit: false,
        mainFavorite,
        prices: null,
        historicalPrices: null
      },
      () => {
        this.fetchPrices()
        this.fetchHistorical()
      }
    )
    localStorage.setItem(
      'cryptoBoard',
      JSON.stringify({
        favorites: this.state.favorites,
        mainFavorite
      })
    )
  }

  setMainFavorite = coinSym => {
    this.setState(
      {
        mainFavorite: coinSym,
        historicalPrices: null
      },
      this.fetchHistorical
    )
    localStorage.setItem(
      'cryptoBoard',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('cryptoBoard')),
        mainFavorite: coinSym
      })
    )
  }

  fetchPrices = async () => {
    if (this.state.firstVisit) return
    let prices = await this.prices()
    prices = prices.filter(price => !!Object.keys(price).length)
    this.setState({ prices })
  }

  prices = async () => {
    const returnData = []
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        const priceData = await cc.priceFull(this.state.favorites[i], 'USD')
        returnData.push(priceData)
      } catch (error) {
        console.warn('Fetch price error: ', error)
      }
    }
    return returnData
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
