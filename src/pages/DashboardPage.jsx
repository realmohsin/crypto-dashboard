import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import PriceGrid from '../components/PriceGrid'
import CoinSpotlight from '../components/CoinSpotlight'
import PriceChart from '../components/PriceChart'
import appContext from '../appContext'

const ChartGrid = styled.div`
  display: grid;
  margin-top: 5rem;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 3fr;
`

const DashboardPage = props => {
  return (
    <appContext.Consumer>
      {({ prices }) => {
        if (!prices) {
          return <div>Loading Prices</div>
        }
        return (
          <>
            <PriceGrid />
            <ChartGrid>
              <CoinSpotlight />
              <PriceChart />
            </ChartGrid>
          </>
        )
      }}
    </appContext.Consumer>
  )
}

export default DashboardPage
