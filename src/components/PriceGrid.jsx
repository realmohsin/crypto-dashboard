import React from 'react'
import styled from '@emotion/styled'
import appContext from '../appContext'
import PriceTile from './PriceTile'

const PriceGridStyled = styled.section`
  grid-area: a;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1.5rem;
  margin-top: 8rem;
  @media (max-width: 1300px) {
    font-size: 1.6rem;
  }
  @media (max-width: 1010px) {
    font-size: 1.8rem;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const PriceGrid = props => {
  return (
    <appContext.Consumer>
      {({ prices }) => (
        <PriceGridStyled>
          {prices &&
            prices.map((price, index) => (
              <PriceTile
                key={`priceTile-${index}`}
                price={price}
                index={index}
              />
            ))}
        </PriceGridStyled>
      )}
    </appContext.Consumer>
  )
}

export default PriceGrid
