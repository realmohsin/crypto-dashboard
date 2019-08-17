import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import PriceGrid from '../components/PriceGrid'
import CoinSpotlight from '../components/CoinSpotlight'

const ChartGrid = styled.div`
  display: grid;
  margin-top: 2rem;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 3fr;
`

const DashboardPage = props => {
  return (
    <>
      <PriceGrid />
      <ChartGrid>
        <CoinSpotlight />
        <div>Chart goes here</div>
      </ChartGrid>
    </>
  )
}

export default DashboardPage
