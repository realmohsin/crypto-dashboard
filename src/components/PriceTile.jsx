import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { SelectableTile } from './Tile'
import { fontSize3, fontSizeBig, greenBoxShadow } from '../styles/styles'
import { CoinHeaderGridStyled } from './CoinHeaderGrid'
import appContext from '../appContext'

const numberFormat = number => {
  return +(number + '').slice(0, 7)
}

const PriceTileStyled = styled(SelectableTile)`
  ${props =>
    props.compact &&
    css`
      ${fontSize3};
      display: grid;
      grid-gap: 5px;
      grid-template-columns: repeat(3, 1fr);
      justify-items: right;
    `}

  ${props =>
    props.mainFavorite &&
    css`
      ${greenBoxShadow};
      pointer-events: none;
    `}
`

const JustifyRight = styled.div`
  justify-self: right;
`

const JustifyLeft = styled.div`
  justify-self: left;
`

const TickerPrice = styled.div`
  ${fontSizeBig};
`

const ChangePct = styled.div`
  color: green;
  ${props =>
    props.red &&
    css`
      color: red;
    `}
`

const ChangePercent = ({ data }) => (
  <JustifyRight>
    <ChangePct red={data.CHANGEPCT24HOUR < 0}>
      {numberFormat(data.CHANGEPCT24HOUR)}%
    </ChangePct>
  </JustifyRight>
)

const PriceTileNormal = ({ coinSym, data, mainFavorite, setMainFavorite }) => (
  <PriceTileStyled onClick={setMainFavorite} mainFavorite={mainFavorite}>
    <CoinHeaderGridStyled>
      <div>{coinSym}</div>
      <ChangePercent data={data} />
    </CoinHeaderGridStyled>
    <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
  </PriceTileStyled>
)

const PriceTileCompact = ({ coinSym, data, mainFavorite, setMainFavorite }) => (
  <PriceTileStyled onClick={setMainFavorite} compact mainFavorite={mainFavorite}>
    <JustifyLeft>{coinSym}</JustifyLeft>
    <ChangePercent data={data} />
    <div>${numberFormat(data.PRICE)}</div>
  </PriceTileStyled>
)

const PriceTile = ({ price, index }) => {
  const coinSym = Object.keys(price)[0]
  const data = price[coinSym]['USD']
  const TileType = index < 5 ? PriceTileNormal : PriceTileCompact
  return (
    <appContext.Consumer>
      {({ mainFavorite, setMainFavorite }) => (
        <TileType
          coinSym={coinSym}
          data={data}
          mainFavorite={mainFavorite === coinSym}
          setMainFavorite={() => setMainFavorite(coinSym)}
        />
      )}
    </appContext.Consumer>
  )
}

export default PriceTile
