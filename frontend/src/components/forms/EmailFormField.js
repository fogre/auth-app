import React from 'react'
import PropTypes from 'prop-types'
import { handleChange } from '../../utils/formFunctions'
import { StyledError, StyledInput } from '../../styles/mixins'

const EmailFormField = ({ cred, setCred, error }) => {
  return (
    <React.Fragment>
      {error.email && <StyledError>{error.email}</StyledError>}
      <StyledInput
        type='email'
        name='email'
        value={cred.email}
        onChange={e => handleChange(e, cred, setCred)}
        placeholder='Email'
      />
      <StyledInput
        type='email'
        name='emailtwo'
        autofill='off'
        autocomplete='off'
        value={cred.emailtwo}
        onChange={e => handleChange(e, cred, setCred)}
        placeholder='Confirm email'
      />
    </React.Fragment>
  )
}

EmailFormField.propTypes = {
  cred: PropTypes.any,
  setCred: PropTypes.func,
  error: PropTypes.any
}

export default EmailFormField