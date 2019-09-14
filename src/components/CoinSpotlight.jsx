import React from 'react'
import styled from '@emotion/styled'
import appContext from '../appContext'
import { Tile } from './Tile'
import CoinImage from './CoinImage'

const SpotlightName = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 7rem;
  @media (max-width: 1300px) {
    font-size: 5rem;
  }
  @media (max-width: 900px) {
    font-size: 5rem;
    margin-bottom: 0;
  }
  @media (max-width: 500px) {
    font-size: 3rem;
    margin-bottom: 0;
  }
`

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  @media (max-width: 900px) {
    flex-direction: row-reverse;
    align-items: center;
  }
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
