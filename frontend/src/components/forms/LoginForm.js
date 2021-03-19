import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { AppState } from '../../utils/StateProvider'
import { handleChange } from '../../utils/formFunctions'
import { StyledError, StyledInput, StyledSubmit } from '../../styles/mixins'

const LoginInput = styled(StyledInput)`
  background-image: ${props => `url(${props.background})`};
  background-repeat: no-repeat;
  background-position: 3% 45%;
  background-size: 1.5em;
  text-indent: 1.7em;
`
const LoginForm = () => {
  const { error, login } = useContext(AppState)
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()
    login(credentials)
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      {error.login && <StyledError>{error.login}</StyledError>}
      <LoginInput
        type='text'
        name='email'
        value={credentials.email}
        onChange={e => handleChange(e, credentials, setCredentials)}
        placeholder={'Email'}
        background={'/public/email.svg'}
      />
      <LoginInput
        type='password'
        name='password'
        value={credentials.password}
        onChange={e => handleChange(e, credentials, setCredentials)}
        placeholder={'Password'}
        background={'/public/lock.svg'}
      />
      <StyledSubmit type='submit'>Login</StyledSubmit>
    </form>
  )
}

export default LoginForm