import React from 'react'
import pull from 'lodash/pull'
import includes from 'lodash/includes'
import subMonths from 'date-fns/sub_months'
import subDays from 'date-fns/sub_days'
import subWeeks from 'date-fns/sub_weeks'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Global, css } from '@emotion/core'
import cc from 'cryptocompare'
import SettingsPage from './pages/SettingsPage'
import Navbar from './components/Navbar'
import DashboardPage from './pages/DashboardPage'
import AppLayout from './components/AppLayout'
import appContext from './appContext'
import { history } from './index'

// public cryptocompare key
cc.setApiKey('026d195375b081a9b380b618d1213ec2c3d6a440f7a3d032c8b2e99d8611e8b3')

const MAX_FAVORITES = 10
const TIME_UNITS = 10

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      favorites: ['BTC', 'ETH', 'NXT', 'LTC', 'CLOAK'],
      confirmFavorites: this.confirmFavorites,
      timeInterval: 'months',
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      setFilteredCoins: this.setFilteredCoins,
      setMainFavorite: this.setMainFavorite,
      changeChartSelect: this.changeChartSelect,
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
    const timeInterval = this.state.timeInterval
    let subtractMonthsWeeksOrDays
    if (timeInterval === 'months') {
      subtractMonthsWeeksOrDays = subMonths
    } else if (timeInterval === 'weeks') {
      subtractMonthsWeeksOrDays = subWeeks
    } else if (timeInterval === 'days') {
      subtractMonthsWeeksOrDays = subDays
    }
    const results = await this.historical(today, subtractMonthsWeeksOrDays)
    const historicalPrices = [
      {
        name: this.state.mainFavorite,
        data: results.map((priceObj, index) => [
          subtractMonthsWeeksOrDays(today, TIME_UNITS - index).valueOf(),
          priceObj.USD
        ])
      }
    ]
    this.setState({ historicalPrices })
  }

  historical = (today, subtractMonthsWeeksOrDays) => {
    const promises = []
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.mainFavorite,
          ['USD'],
          subtractMonthsWeeksOrDays(today, units)
        )
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

  setFilteredCoins = filteredCoins => {
    console.log(filteredCoins)
    this.setState({ filteredCoins })
  }
  getSavedSettings () {
    const cryptoPriceData = JSON.parse(localStorage.getItem('cryptoPrice'))
    if (!cryptoPriceData) {
      return { firstVisit: true }
    }
    const { favorites, mainFavorite } = cryptoPriceData
    console.log('favorites: ', favorites)
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
        history.push('/dashboard')
      }
    )
    localStorage.setItem(
      'cryptoPrice',
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
      'cryptoPrice',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('cryptoPrice')),
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

  changeChartSelect = timeInterval =>
    this.setState({ timeInterval, historicalPrices: null }, this.fetchHistorical)

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
              <Route
                path='/dashboard'
                render={() =>
                  firstVisit ? <Redirect to={rootRedirectPath} /> : <DashboardPage />
                }
              />
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
    @media (max-width: 1010px) {
      font-size: 50%;
    }
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
