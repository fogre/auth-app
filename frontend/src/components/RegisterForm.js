import React, { useState } from 'react'
import services from '../utils/services'
import { handleChange } from '../utils/formFunctions'
import { StyledError, StyledInput, StyledSubmit } from '../styles/mixins'

const RegisterForm = props => {
  const [mailError, setMailError] = useState(null)
  const [passError, setPassError] = useState(null)
  const [credentials, setCredentials] = useState({
    email: '',
    emailtwo: '',
    password: '',
    passwordtwo: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()

    let error, errortwo = null
    if (!mailError && credentials.email !== credentials.emailtwo) {
      error = 'Emails are not equal'
    } else if (mailError) {
      error  = null
    }

    if (!passError && credentials.password !== credentials.passwordtwo) {
      errortwo = 'Passwords are not equal'
    } else if (passError) {
      errortwo = null
    }

    if (!error || !errortwo) {
      try {
        const res = await services.createUser(credentials)
        props.login(res)
      } catch (e) {
        const eMessage = e.response.data.error
        if (eMessage.includes('email')) {
          setMailError(eMessage)
          setPassError(errortwo)
        }
        if (eMessage.includes('password')) {
          setMailError(error)
          setPassError(eMessage)
        }
      }
    } else if (error !== mailError || errortwo !== passError) {
      setMailError(error)
      setPassError(errortwo)
    }
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <p>Enter email address</p>
      {mailError && <StyledError>{mailError}</StyledError>}
      <StyledInput
        type='text'
        name='email'
        value={credentials.email}
        onChange={(e) => handleChange(e, credentials, setCredentials)}
        placeholder='Email'
      />
      <StyledInput
        type='text'
        name='emailtwo'
        value={credentials.emailtwo}
        onChange={(e) => handleChange(e, credentials, setCredentials)}
        placeholder='Confirm email'
      />
      <p>Enter password</p>
      {passError && <StyledError>{passError}</StyledError>}
      <StyledInput
        type='password'
        name='password'
        value={credentials.password}
        onChange={(e) => handleChange(e, credentials, setCredentials)}
        placeholder='Password'
      />
      <StyledInput
        type='password'
        name='passwordtwo'
        value={credentials.passwordtwo}
        onChange={(e) => handleChange(e, credentials, setCredentials)}
        placeholder='Confirm password'
      />
      <StyledSubmit type='submit'>Register</StyledSubmit>
    </form>
  )
}

export default RegisterForm