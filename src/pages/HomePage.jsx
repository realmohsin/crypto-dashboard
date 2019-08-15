import React from 'react'
import { css } from '@emotion/core'
import PageLayout from '../components/PageLayout'
import WelcomeMessage from '../components/WelcomeMessage'
import Navbar from '../components/Navbar'

const HomePage = props => {
  return (
    <PageLayout>
      <Navbar />
      <WelcomeMessage />
    </PageLayout>
  )
}

export default HomePage
