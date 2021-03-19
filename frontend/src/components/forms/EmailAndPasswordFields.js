import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AppState } from '../../utils/StateProvider'
import EmailFormField from './EmailFormField'
import PasswordFormField from './PasswordFormField'
import { StyledFormField } from '../../styles/mixins'

const EmailAndPasswordFields = ({ updateInfo, setUpdateInfo }) => {
  const { error } = useContext(AppState)

  return (
    <React.Fragment>
      <StyledFormField>
        <p>email</p>
        <EmailFormField
          cred={updateInfo}
          setCred={setUpdateInfo}
          error={error}
        />
      </StyledFormField>
      <StyledFormField>
        <p>password</p>
        <PasswordFormField
          cred={updateInfo}
          setCred={setUpdateInfo}
          error={error}
        />
      </StyledFormField>
    </React.Fragment>
  )
}

EmailAndPasswordFields.propTypes = {
  updateInfo: PropTypes.any,
  setUpdateInfo: PropTypes.func
}

export default EmailAndPasswordFields