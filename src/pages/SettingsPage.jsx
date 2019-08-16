import React from 'react'
import { css } from '@emotion/core'
import WelcomeMessage from '../components/WelcomeMessage'
import ConfirmButton from '../components/ConfirmButton'
import CoinGrid from '../components/CoinGrid'

const SettingsPage = props => {
  return (
    <>
      <WelcomeMessage />
      <ConfirmButton />
      <CoinGrid />
    </>
  )
}

export default SettingsPage
