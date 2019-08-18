import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import appContext from '../appContext'
import { Tile } from './Tile'
import CoinImage from './CoinImage'

const SpotlightName = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 7rem;
`

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

const CoinSpotlight = props => {
  return (
    <appContext.Consumer>
      {({ mainFavorite, coinList }) => (
        <Tile>
          <CenterDiv>
            <SpotlightName>{coinList[mainFavorite].CoinName}</SpotlightName>
            <CoinImage spotlight coin={coinList[mainFavorite]} />
          </CenterDiv>
        </Tile>
      )}
    </appContext.Consumer>
  )
}

export default CoinSpotlight
