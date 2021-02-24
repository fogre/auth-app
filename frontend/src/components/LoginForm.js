import React, { useState } from 'react'
import services from '../utils/services'
import { handleChange } from '../utils/formFunctions'
import { StyledError, StyledInput, StyledSubmit } from '../styles/mixins'

const LoginForm = props => {
  const [error, setError] = useState(null)
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const user = await services.login(credentials)
      props.login(user)
    } catch (e) {
      setError(e.response.data.error)
    }
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      {error && <StyledError>{error}</StyledError>}
      <StyledInput
        type='text'
        name='email'
        value={credentials.email}
        onChange={e => handleChange(e, credentials, setCredentials)}
        placeholder={'Email'}
        background={'/public/email.svg'}
      />
      <StyledInput
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