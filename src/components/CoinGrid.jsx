import React from 'react'
import styled from '@emotion/styled'
import appContext from '../appContext'
import CoinTile from './CoinTile'

const CoinGridStyled = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;
  margin-top: 4rem;
  @media (max-width: 840px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 680px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 499px) {
    grid-template-columns: repeat(2, 1fr);
  }
`
// minmax(130px, 1fr) - original

const getCoinsToDisplay = (
  coinList,
  topSection,
  favorites,
  filteredCoins,
  numOfCoins
) =>
  topSection
    ? favorites
    : (filteredCoins && Object.keys(filteredCoins).slice(0, numOfCoins)) ||
      Object.keys(coinList).slice(0, numOfCoins)

class CoinGrid extends React.Component {
  state = {
    numOfCoins: 25
  }

  componentDidMount () {
    const handleWindowScrollOnce = () => {
      this.setState({ numOfCoins: 50 })
    }
    window.addEventListener('scroll', handleWindowScrollOnce, { once: true })
  }

  componentWillUnmount () {
    clearTimeout(this.timerId)
  }

  render () {
    const { topSection } = this.props
    return (
      <appContext.Consumer>
        {({ coinList, favorites, filteredCoins }) => (
          <CoinGridStyled>
            {getCoinsToDisplay(
              coinList,
              topSection,
              favorites,
              filteredCoins,
              this.state.numOfCoins
            ).map(coinKey => (
              <CoinTile
                key={coinKey}
                coinKey={coinKey}
                topSection={topSection}
              />
            ))}
          </CoinGridStyled>
        )}
      </appContext.Consumer>
    )
  }
}

export default CoinGrid
