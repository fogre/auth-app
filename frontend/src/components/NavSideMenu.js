import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { AppState } from '../utils/StateProvider'
import styled from 'styled-components'
import { ExitComponent } from './SvgComponents'
import { lightBorder, flexAlignCenter, shadow, StyledError } from '../styles/mixins'

const MenuContainer = styled.div`
  ${lightBorder}
  ${shadow}
  background: white;
  border-radius: 0.6em;
  display: border-box;
  position: absolute;
  right: 3%;
  width: 20%;
  max-width: 200px;

  @media screen and (max-width: 750px) {
    width: 100%;
  }
`
const MenuItem = styled.div`
  ${flexAlignCenter}
  border-radius: 0.5em;
  margin: 0.5em;
  padding: 0.5em;
  cursor: pointer;

  img {
    background: grey;
    border-radius: 50%;
    width: 20px;
  }

  p {
    margin-left: 0.5em;
  }

  :hover {
    background: ${props => props.theme.lightGrey};
  }
`
const Line = styled.div`
  margin: 0.5em;
  border-bottom: 2px solid ${props => props.theme.lightGrey};
`

const NavSideMenu = ({ setVisible }) => {
  const history = useHistory()
  const { logout } = useContext(AppState)

  const changeView = () => {
    setVisible(false)
    history.push('/')
  }

  return (
    <MenuContainer>
      <MenuItem onClick={() => changeView()}>
        <img src={'/public/avatar1.svg'} />
        <p>My profile</p>
      </MenuItem>
      <Line />
      <MenuItem onClick={() => logout()}>
        <ExitComponent />
        <StyledError>Logout</StyledError>
      </MenuItem>
    </MenuContainer>
  )
}

NavSideMenu.propTypes = {
  setVisible: PropTypes.func.isRequired
}

export default NavSideMenu

