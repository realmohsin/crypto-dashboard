import React from 'react'
import { css } from '@emotion/core'

const CoinImage = ({ coin, style }) => {
  return (
    <img
      style={style || { height: '50px' }}
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
      alt={coin.CoinSymbol}
    />
  )
}

export default CoinImage
