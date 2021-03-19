import React, { useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AppState } from '../../utils/StateProvider'
import { hover, flexAlignCenter, StyledAvatar } from '../../styles/mixins'

const ImageWrapper = styled.div`
  ${flexAlignCenter}
  margin: 1em 0;

  p {
    ${hover}
    cursor: pointer;
    padding: 0.3em 1em;
  }
`
const ImageUpload = ({ user }) => {
  const photoInput = useRef()
  const { uploadImage } = useContext(AppState)

  const upload = e => {
    e.stopPropagation()
    e.preventDefault()
    if (e.target.files[0]) {
      uploadImage(e.target.files[0])
    }
  }

  return (
    <ImageWrapper>
      <form>
        <input
          type='file'
          id='userImg'
          name='userImg'
          accept='image/png, image/jpeg'
          ref={photoInput}
          style={{ display: 'none' }}
          onChange={(e) => upload(e)}
        />
        <ImageWrapper>
          <StyledAvatar src={user.photo} onClick={() => photoInput.current.click()}/>
          <p onClick={() => photoInput.current.click()}>change image</p>
        </ImageWrapper>
      </form>
    </ImageWrapper>
  )
}

ImageUpload.propTypes = {
  user: PropTypes.object.isRequired
}

export default ImageUpload