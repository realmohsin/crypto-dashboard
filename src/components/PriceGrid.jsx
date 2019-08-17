import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import appContext from '../appContext'
import PriceTile from './PriceTile'

const PriceGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1.5rem;
  margin-top: 4rem;
`

const PriceGrid = props => {
  return (
    <appContext.Consumer>
      {({ prices }) => (
        <PriceGridStyled>
          {prices &&
            prices.map((price, index) => <PriceTile price={price} index={index} />)}
        </PriceGridStyled>
      )}
    </appContext.Consumer>
  )
}

export default PriceGrid
