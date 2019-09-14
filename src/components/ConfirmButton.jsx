import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'
import appContext from '../appContext'
import { fontSize1, greenBoxShadow, color3 } from '../styles/styles'

const ConfirmButtonStyled = styled.div`
  display: inline-block;
  margin: 3rem;
  padding: 0.5rem 1.5rem;
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
          <div>
            <FontAwesomeIcon icon={faArrowRight} />
            <ConfirmButtonStyled onClick={confirmFavorites}>
              Confirm Favorites
            </ConfirmButtonStyled>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
        </CenterDiv>
      )}
    </appContext.Consumer>
  )
}

export default ConfirmButton
