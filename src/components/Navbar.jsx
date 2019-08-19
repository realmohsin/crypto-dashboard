import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { NavLink, Link } from 'react-router-dom'
import appContext from '../appContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarcode } from '@fortawesome/free-solid-svg-icons'

const Logo = styled.div`
  color: #d5be00;
  font-size: 1.3em;
`

const NavbarElem = styled.nav`
  color: gray;
  display: grid;
  grid-template-columns: 16rem auto 12rem 12rem;
  margin-bottom: 4rem;
  @media (max-width: 499px) {
    font-size: 1.5rem;
    grid-template-columns: 12rem auto 8rem 8rem;
  }
`

// #03ff03

const navLinkStyle = css`
  place-self: center;
`

const activeStyle = {
  color: '#D5BE00',
  textShadow: '0px 0px 15px #03ff03'
}

const Navbar = () => (
  <appContext.Consumer>
    {({ firstVisit }) => (
      <NavbarElem>
        <Logo>
          <Link to='/'>
            <FontAwesomeIcon icon={faBarcode} /> CryptoPrice
          </Link>
        </Logo>
        <div />
        {firstVisit ? (
          <div />
        ) : (
          <NavLink to='/dashboard' activeStyle={activeStyle} css={navLinkStyle}>
            Dashboard
          </NavLink>
        )}
        <NavLink to='/settings' activeStyle={activeStyle} css={navLinkStyle}>
          Settings
        </NavLink>
      </NavbarElem>
    )}
  </appContext.Consumer>
)

export default Navbar
