import React, { useState, useContext } from 'react'
import { AppState } from '../../utils/StateProvider'
import EmailFormField from './EmailFormField'
import PasswordFormField from './PasswordFormField'
import { checkEmailAndPassword } from '../../utils/formFunctions'
import { StyledSubmit } from '../../styles/mixins'

const RegisterForm = () => {
  const { createUser, error, showError } = useContext(AppState)
  const [credentials, setCredentials] = useState({
    email: '',
    emailtwo: '',
    password: '',
    passwordtwo: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()
    if (checkEmailAndPassword(credentials, showError)) {
      createUser(credentials)
    }
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <p>Enter email address</p>
      <EmailFormField
        cred={credentials}
        setCred={setCredentials}
        error={error}
      />
      <p>Enter password</p>
      <PasswordFormField
        cred={credentials}
        setCred={setCredentials}
        error={error}
      />
      <StyledSubmit type='submit'>Register</StyledSubmit>
    </form>
  )
}

export default RegisterForm