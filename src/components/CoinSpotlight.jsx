import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import appContext from '../appContext'
import { Tile } from './Tile'
import CoinImage from './CoinImage'

const SpotlightName = styled.h2`
  text-align: center;
`

const CoinSpotlight = props => {
  return (
    <appContext.Consumer>
      {({ mainFavorite, coinList }) => (
        <Tile>
          <SpotlightName>{coinList[mainFavorite].CoinName}</SpotlightName>
          <CoinImage spotlight coin={coinList[mainFavorite]} />
        </Tile>
      )}
    </appContext.Consumer>
  )
}

export default CoinSpotlight
