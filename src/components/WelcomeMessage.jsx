import React from 'react'
import { css } from '@emotion/core'
import appContext from '../appContext'

const WelcomeMessage = props => {
  return (
    <appContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? (
          <div>
            Welcome to the Crypto Dashboard, please select your favorite coins to begin
          </div>
        ) : null
      }
    </appContext.Consumer>
  )
}

export default WelcomeMessage
