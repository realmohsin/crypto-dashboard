import styled from '@emotion/styled'
import {
  subtleBoxShadow,
  lightBlueBackground,
  greenBoxShadow,
  redBoxShadow
} from '../styles/styles'

export const Tile = styled.div`
  ${subtleBoxShadow};
  ${lightBlueBackground};
  padding: 1rem;
`

export const SelectableTile = styled(Tile)`
  &:hover {
    cursor: pointer;
    ${greenBoxShadow};
  }
`

export const DeletableTile = styled(SelectableTile)`
  &:hover {
    cursor: pointer;
    ${redBoxShadow};
  }
`

export const DisabledTile = styled(Tile)`
  pointer-events: none;
  opacity: 0.4;
`
