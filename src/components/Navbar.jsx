import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import appContext from '../appContext'

const Logo = styled.div`
  font-size: 1.5em;
`

const NavbarElem = styled.nav`
  display: grid;
  grid-template-columns: 18rem auto 12rem 12rem;
  margin-bottom: 4rem;
`

const activeStyle = {
  textShadow: '0px 0px 25px #03ff03'
}

const Navbar = () => (
  <appContext.Consumer>
    {({ firstVisit }) => (
      <NavbarElem>
        <Logo>CryptoBoard</Logo>
        <div />
        {firstVisit ? (
          <div />
        ) : (
          <NavLink to='/dashboard' activeStyle={activeStyle}>
            Dashboard
          </NavLink>
        )}
        <NavLink to='/settings' activeStyle={activeStyle}>
          Settings
        </NavLink>
      </NavbarElem>
    )}
  </appContext.Consumer>
)

export default Navbar
