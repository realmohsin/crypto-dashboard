import React from 'react'
import { css } from '@emotion/core'
import PageLayout from '../components/PageLayout'
import WelcomeMessage from '../components/WelcomeMessage'

const HomePage = props => {
  return (
    <PageLayout>
      <WelcomeMessage />
    </PageLayout>
  )
}

export default HomePage
