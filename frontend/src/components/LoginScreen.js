import React, { useState } from 'react'
import styled from 'styled-components'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import LogoComponent from './Logo'
import { border } from '../styles/mixins'
import GithubSVG from '../assets/Gihub.svg'

const CenteredContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const BorderWrapper = styled.div`
  ${border}
  width: 20em;
  padding: 2.5em;
`
const LowerWrapper = styled.div`
  color: ${props => props.theme.textGrey};
  text-align: center;
  margin: 2em;
`

const GHlogo = styled(GithubSVG)`
  :hover {
    cursor: pointer;

    .path {
      fill: ${props => props.theme.buttonBlue};
    }

    .circle {
      stroke: ${props => props.theme.buttonBlue};
    }
  }
`

const LogRegContainer = props => {
  return (
    <CenteredContainer>
      <BorderWrapper>
        <LogoComponent />
        <h3>{props.h3}</h3>
        {props.form}
        <LowerWrapper>
          <p>{props.HubText} <b>Github</b></p>
          <GHlogo />
          <p>{props.accountText}
            <a onClick={() => props.changeState(!props.currentState)}>
              {props.stateText}
            </a>
          </p>
        </LowerWrapper>
      </BorderWrapper>
    </CenteredContainer>
  )
}

const LoginScreen = props => {
  const [register, setRegister] = useState(false)

  if (!register) {
    return(
      <LogRegContainer
        h3={'Login'}
        form={<LoginForm login={props.login}/>}
        HubText={'or contine with'}
        accountText={'Don\'t have an account yet? '}
        stateText={'Register'}
        currentState={register}
        changeState={setRegister}
      />
    )
  }

  return(
    <LogRegContainer
      h3={'Register'}
      form={<RegisterForm login={props.login}/>}
      HubText={'or register with'}
      accountText={'Have an account already? '}
      stateText={'Login'}
      currentState={register}
      changeState={setRegister}
    />
  )
}

export default LoginScreen