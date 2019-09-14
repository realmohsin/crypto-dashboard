import React from 'react'
import WelcomeMessage from '../components/WelcomeMessage'
import ConfirmButton from '../components/ConfirmButton'
import CoinGrid from '../components/CoinGrid'
import SearchBar from '../components/SearchBar'

const SettingsPage = props => {
  return (
    <>
      <WelcomeMessage />
      <CoinGrid topSection />
      <ConfirmButton />
      <SearchBar />
      <CoinGrid />
    </>
  )
}

export default SettingsPage
