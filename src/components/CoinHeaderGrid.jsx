import React from 'react'
import styled from '@emotion/styled'
import { DeletableTile } from './Tile'

const CoinHeaderGridStyled = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const CoinSymbol = styled.div`
  justify-self: right;
`

const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${DeletableTile}:hover & {
    display: block;
    color: red;
  }
`

const CoinHeaderGrid = ({ name, symbol, topSection }) => (
  <CoinHeaderGridStyled>
    <div>{name}</div>
    {topSection ? (
      <DeleteIcon> X </DeleteIcon>
    ) : (
      <CoinSymbol>{symbol}</CoinSymbol>
    )}
  </CoinHeaderGridStyled>
)

export { CoinHeaderGridStyled, CoinSymbol, CoinHeaderGrid as default }
