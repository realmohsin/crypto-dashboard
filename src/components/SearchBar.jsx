import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { backgroundColor2, fontSize2 } from '../styles/styles'
import appContext from '../appContext'
import debounce from 'lodash/debounce'
import pickBy from 'lodash/pickBy'
import fuzzy from 'fuzzy'

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
`

const SearchInput = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  border: 1px solid;
  height: 2.5rem;
  color: #1163c9;
  place-self: center left;
`

const handleFilter = debounce((inputValue, setFilteredCoins, coinList) => {
  const coinSymbols = Object.keys(coinList)
  const coinNames = coinSymbols.map(coinSymbol => coinList[coinSymbol].CoinName)
  const stringsToSearch = coinSymbols.concat(coinNames)
  const results = fuzzy.filter(inputValue, stringsToSearch).map(result => result.string)
  const filteredCoins = pickBy(coinList, (result, symKey) => {
    const coinName = result.CoinName
    return results.includes(coinName) || results.includes(symKey)
  })
  setFilteredCoins(filteredCoins)
}, 500)

const filterCoins = (e, setFilteredCoins, coinList) => {
  const inputValue = e.target.value
  if (!inputValue) {
    setFilteredCoins(null)
    return
  }
  handleFilter(inputValue, setFilteredCoins, coinList)
}

const SearchBar = props => {
  return (
    <appContext.Consumer>
      {({ setFilteredCoins, coinList }) => (
        <SearchGrid>
          <h2>Search</h2>
          <SearchInput onKeyUp={e => filterCoins(e, setFilteredCoins, coinList)} />
        </SearchGrid>
      )}
    </appContext.Consumer>
  )
}

export default SearchBar
