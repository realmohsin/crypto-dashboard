import React from 'react'
import styled from '@emotion/styled'
import PriceGrid from '../components/PriceGrid'
import CoinSpotlight from '../components/CoinSpotlight'
import PriceChart from '../components/PriceChart'
import appContext from '../appContext'

const DashboardStyled = styled.div`
  display: grid;
  grid-template-areas:
    'a'
    'b';
  @media (max-width: 900px) {
    grid-template-areas:
      'b'
      'a';
  }
`

const ChartGrid = styled.div`
  grid-area: b;
  display: grid;
  margin-top: 5rem;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 3fr;

  @media (max-width: 1300px) {
    font-size: 1.8rem;
  }
  @media (max-width: 900px) {
    grid-template-columns: none;
  }
`

const DashboardPage = props => {
  return (
    <appContext.Consumer>
      {({ prices }) => {
        if (!prices) {
          return <div>Loading Prices</div>
        }
        return (
          <DashboardStyled>
            <PriceGrid />
            <ChartGrid>
              <CoinSpotlight />
              <PriceChart />
            </ChartGrid>
          </DashboardStyled>
        )
      }}
    </appContext.Consumer>
  )
}

export default DashboardPage
