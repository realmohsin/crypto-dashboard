import React from 'react'
import styled from '@emotion/styled'
import appContext from '../appContext'

const WelcomeMessageStyled = styled.header`
  margin-top: 4rem;
  font-size: 3.4rem;
  text-align: center;
`

const WelcomeMessage = props => {
  return (
    <appContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? (
          <WelcomeMessageStyled>
            Welcome to CryptoPrice. Please confirm your favorite coins to begin:
          </WelcomeMessageStyled>
        ) : (
          <WelcomeMessageStyled>Set your favorite coins:</WelcomeMessageStyled>
        )
      }
    </appContext.Consumer>
  )
}

export default WelcomeMessage
