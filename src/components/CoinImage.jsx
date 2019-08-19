import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const CoinImageStyled = styled.img`
  height: 5rem;
  margin-top: 1.5rem;
  ${props =>
    props.spotlight &&
    css`
      height: 20rem;
      margin: 0 auto;
      display: block;
    `}
  @media (max-width: 900px) {
    height: 7rem;
    margin: 1rem;
  }
  @media (max-width: 500px) {
    height: 4rem;
  }
`

const CoinImage = ({ coin, spotlight }) => {
  return (
    <CoinImageStyled
      spotlight={spotlight}
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
      alt={coin.CoinSymbol}
    />
  )
}

export default CoinImage
