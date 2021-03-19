import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Footer from './Footer'
import LoginForm from './forms/LoginForm'
import RegisterForm from './forms/RegisterForm'
import { GHlogoComponent, LogoComponent } from './SvgComponents'
import { border, StyledCenteredContainer } from '../styles/mixins'

const Container = styled.div`
  display: block;
  width: 25em;
  
  @media screen and (max-width: 750px) {
    width: 100%;
  }
`

const BorderWrapper = styled.div`
  ${border}
  padding: 2.5em;

  @media screen and (max-width: 750px) {
    border: none;
  }
`
const LowerWrapper = styled.div`
  color: ${props => props.theme.textGrey};
  text-align: center;
  margin: 2em;
`
const LogRegContainer = props => {
  const history = useHistory()

  return (
    <StyledCenteredContainer>
      <Container>
        <BorderWrapper>
          <LogoComponent />
          <h3>{props.h3}</h3>
          {props.form}
          <LowerWrapper>
            <p>{props.hubText} <b>Github</b></p>
            <a href='https://github.com/login/oauth/authorize?client_id=fc6da9d88b2f358a0cf6'>
              <GHlogoComponent />
            </a>
            <p>{props.accountText}
              <a onClick={() => history.push(props.url)}>
                {props.stateText}
              </a>
            </p>
          </LowerWrapper>
        </BorderWrapper>
        <Footer />
      </Container>
    </StyledCenteredContainer>
  )
}

const LoginScreen = props => {

  if (!props.register) {
    return(
      <LogRegContainer
        h3={'Login'}
        form={<LoginForm/>}
        hubText={'or contine with'}
        accountText={'Don\'t have an account yet? '}
        stateText={'Register'}
        url={'/register'}
      />
    )
  }

  return(
    <LogRegContainer
      h3={'Register'}
      form={<RegisterForm/>}
      hubText={'or register with'}
      accountText={'Have an account already? '}
      stateText={'Login'}
      url={'/login'}
    />
  )
}

LogRegContainer.propTypes = {
  h3: PropTypes.string.isRequired,
  form: PropTypes.element.isRequired,
  hubText: PropTypes.string.isRequired,
  accountText: PropTypes.string.isRequired,
  stateText: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

LoginScreen.propTypes = {
  register: PropTypes.bool
}

export default LoginScreen