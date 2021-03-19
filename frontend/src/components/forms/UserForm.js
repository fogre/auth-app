import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AppState } from '../../utils/StateProvider'
import DeleteButton from './DeleteButton'
import EmailAndPasswordFields from './EmailAndPasswordFields'
import FormVisibilityWrapper from './FormVisibilityWrapper'
import ImageUpload from './ImageUpload'
import { checkEmailAndPassword, handleChange  } from '../../utils/formFunctions'
import {
  inputStyles,
  StyledFormField,
  StyledHeading,
  StyledInput,
  StyledSubmit
} from '../../styles/mixins'

const FormWrapper = styled.div`
  padding: 1.5em 2em;

  button {
    margin-top: 2em;
    width: 1%;
    min-width: 90px;
  }

  form {
    margin-bottom: 1em;
  }
`
const TextArea = styled.textarea`
  ${inputStyles}
  height: 7em;
  resize: none;
  overflow: hidden;
`
const UserForm = ({ user }) => {
  const { showError, updateUser } = useContext(AppState)
  const [updateInfo, setUpdateInfo] = useState({
    ...user,
    emailtwo: '',
    password: '',
    passwordtwo: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    if(checkEmailAndPassword(updateInfo, showError)) {
      updateUser(updateInfo)
    }
  }

  return (
    <FormWrapper>
      <StyledHeading>
        <h2>Change info</h2>
        <p>Changes will be reflected to every service</p>
      </StyledHeading>
      <ImageUpload user={user}/>
      <form onSubmit={e => handleSubmit(e)}>
        <StyledFormField>
          <p>name</p>
          <StyledInput
            type='text'
            name='name'
            value={updateInfo.name}
            onChange={e => handleChange(e, updateInfo, setUpdateInfo)}
            placeholder={updateInfo.name ? updateInfo.name : 'Enter your name...'}
          />
        </StyledFormField>
        <StyledFormField>
          <p>bio</p>
          <TextArea
            name='bio'
            value={updateInfo.bio}
            onChange={e => handleChange(e, updateInfo, setUpdateInfo)}
            placeholder={updateInfo.bio ? updateInfo.bio : 'Enter your bio...'}
          />
        </StyledFormField>
        <StyledFormField>
          <p>phone</p>
          <StyledInput
            type='text'
            name='phone'
            value={updateInfo.phone}
            onChange={e => handleChange(e, updateInfo, setUpdateInfo)}
            placeholder={updateInfo.phone ? updateInfo.phone : 'Enter your phone...'}
          />
        </StyledFormField>
        <FormVisibilityWrapper heading={'Change email or password'} >
          <EmailAndPasswordFields
            updateInfo={updateInfo}
            setUpdateInfo={setUpdateInfo}
          />
        </FormVisibilityWrapper>
        <StyledSubmit type='submit'>save</StyledSubmit>
      </form>
      <FormVisibilityWrapper heading={'Delete account'}>
        <DeleteButton />
      </FormVisibilityWrapper>
    </FormWrapper>
  )
}

UserForm.propTypes = {
  user: PropTypes.any
}

export default UserForm