import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import NavSideMenu from './NavSideMenu'
import { LogoComponent, DropdownComponent } from './SvgComponents'
import {
  hover,
  flexAlignCenter,
  StyledAvatar,
  StyledVisibleWrapper
} from '../styles/mixins'

const NavContainer = styled.div`
  ${flexAlignCenter}
  padding: 2em 3%;
`
const MenuWrapper = styled.div`
  display: block;
  margin-left: auto;
`
const MenuSelector = styled.div`
  ${hover}
  ${flexAlignCenter}
  margin-left: auto;

  @media screen and (max-width: 750px) {
    h4 {
      font-size: 0;
    }
  }
`
const Avatar = styled(StyledAvatar)`
  width: 30px;
  height: 30px;
  margin-right: 0.5em;
`

const NavBar =({ user }) => {
  const [visible, setVisible] = useState(false)

  return (
    <NavContainer>
      <LogoComponent />
      <MenuWrapper onMouseLeave={() => setVisible(false)}>
        <MenuSelector onClick={() => setVisible(!visible)}>
          <Avatar src={user.photo} />
          <h4>{user.name}</h4>
          <DropdownComponent $visible={visible}/>
        </MenuSelector>
        <StyledVisibleWrapper visible={visible}>
          <NavSideMenu setVisible={setVisible}/>
        </StyledVisibleWrapper>
      </MenuWrapper>
    </NavContainer>
  )
}

NavBar.propTypes = {
  user: PropTypes.object
}

export default NavBar