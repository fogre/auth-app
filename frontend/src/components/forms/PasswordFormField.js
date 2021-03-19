import React from 'react'
import PropTypes from 'prop-types'
import { handleChange } from '../../utils/formFunctions'
import { StyledError, StyledInput } from '../../styles/mixins'

const PasswordFormField = ({ cred, setCred, error }) => {
  return (
    <React.Fragment>
      {error.password && <StyledError>{error.password}</StyledError>}
      <StyledInput
        type='password'
        name='password'
        autocomplete='new-password'
        value={cred.password}
        onChange={e => handleChange(e, cred, setCred)}
        placeholder='New password'
      />
      <StyledInput
        type='password'
        name='passwordtwo'
        autocomplete='new-password'
        value={cred.passwordtwo}
        onChange={e => handleChange(e, cred, setCred)}
        placeholder='Confirm password'
      />
    </React.Fragment>
  )
}

PasswordFormField.propTypes = {
  cred: PropTypes.object,
  setCred: PropTypes.func,
  error: PropTypes.object
}

export default PasswordFormField