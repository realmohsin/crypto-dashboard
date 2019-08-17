import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import appContext from '../appContext'
import { SelectableTile } from './Tile'
import CoinTile from './CoinTile'

const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1.5rem;
  margin-top: 4rem;
`
// minmax(130px, 1fr) - original

const getCoinsToDisplay = (coinList, topSection, favorites, filteredCoins) =>
  topSection
    ? favorites
    : (filteredCoins && Object.keys(filteredCoins).slice(0, 100)) ||
      Object.keys(coinList).slice(0, 100)

const CoinGrid = ({ topSection }) => {
  return (
    <appContext.Consumer>
      {({ coinList, favorites, filteredCoins }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(
            coinKey => (
              <CoinTile key={coinKey} coinKey={coinKey} topSection={topSection} />
            )
          )}
        </CoinGridStyled>
      )}
    </appContext.Consumer>
  )
}

export default CoinGrid
