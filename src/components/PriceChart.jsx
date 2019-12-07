import React from 'react'
import ReactHighcharts from 'react-highcharts'
import ChartSelect from './ChartSelect'
import highchartsConfig from '../highcharts/highchartsConfig'
import highchartsTheme from '../highcharts/highchartsTheme'
import appContext from '../appContext'
import { Tile } from './Tile'

ReactHighcharts.Highcharts.setOptions(highchartsTheme)

class PriceChart extends React.Component {
  state = { height: null }

  componentDidMount () {
    const height = parseInt(
      document.querySelector('.highcharts-container').style.height
    )
    this.setState({ height })
  }

  render () {
    return (
      <appContext.Consumer>
        {({ historicalPrices, changeChartSelect, timeInterval }) => (
          <Tile noPadding>
            <ChartSelect
              value={timeInterval}
              onChange={e => changeChartSelect(e.target.value)}
            >
              <option value='days'>Days</option>
              <option value='weeks'>Weeks</option>
              <option value='months'>Months</option>
            </ChartSelect>
            <ReactHighcharts
              config={highchartsConfig(historicalPrices, this.state.height)}
            />
          </Tile>
        )}
      </appContext.Consumer>
    )
  }
}

export default PriceChart
