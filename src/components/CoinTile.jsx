import React from 'react'
import appContext from '../appContext'
import { SelectableTile, DeletableTile, DisabledTile } from './Tile'
import CoinHeaderGrid from './CoinHeaderGrid'
import CoinImage from './CoinImage'

const createClickHandler = (topSection, addCoin, removeCoin, coinKey) =>
  topSection ? () => removeCoin(coinKey) : () => addCoin(coinKey)

const CoinTile = ({ coinKey, topSection }) => {
  return (
    <appContext.Consumer>
      {({ coinList, addCoin, removeCoin, isInFavorites }) => {
        const coin = coinList[coinKey]
        let TileType = SelectableTile
        if (topSection) {
          TileType = DeletableTile
        } else if (isInFavorites(coinKey)) {
          TileType = DisabledTile
        }
        return (
          <TileType
            onClick={createClickHandler(
              topSection,
              addCoin,
              removeCoin,
              coinKey
            )}
          >
            <CoinHeaderGrid
              name={coin.CoinName}
              symbol={coin.Symbol}
              topSection={topSection}
            />
            <CoinImage coin={coin} />
          </TileType>
        )
      }}
    </appContext.Consumer>
  )
}

export default CoinTile
