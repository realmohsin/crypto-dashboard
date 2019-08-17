import React from 'react'
import { css } from '@emotion/core'
import ReactHighcharts from 'react-highcharts'
import highchartsConfig from '../highcharts/highchartsConfig'
import highchartsTheme from '../highcharts/highchartsTheme'
import appContext from '../appContext'
import { Tile } from './Tile'

ReactHighcharts.Highcharts.setOptions(highchartsTheme)

const PriceChart = props => {
  return (
    <appContext.Consumer>
      {() => (
        <Tile>
          <ReactHighcharts config={highchartsConfig()} />
        </Tile>
      )}
    </appContext.Consumer>
  )
}

export default PriceChart
