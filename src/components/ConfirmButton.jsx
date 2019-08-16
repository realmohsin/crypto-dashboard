import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import appContext from '../appContext'
import { fontSize1, greenBoxShadow, color3 } from '../styles/styles'

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  padding: 5px;
  color: ${color3};
  ${fontSize1};
  cursor: pointer;
  &:hover {
    ${greenBoxShadow};
  }
`

const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`

const ConfirmButton = props => {
  return (
    <appContext.Consumer>
      {({ confirmFavorites }) => (
        <CenterDiv>
          <ConfirmButtonStyled onClick={confirmFavorites}>
            Confirm Favorites
          </ConfirmButtonStyled>
        </CenterDiv>
      )}
    </appContext.Consumer>
  )
}

export default ConfirmButton
