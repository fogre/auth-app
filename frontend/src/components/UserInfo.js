import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  flexAlignCenter,
  StyledAvatar,
  StyledButton,
  StyledHeading
} from '../styles/mixins'

const ContentField = styled.div`
  ${flexAlignCenter}
  padding: 1.5em 2em;
  border-bottom: ${props => props.lastField
    ? 'none'
    : `1px solid ${props.theme.lightGrey}` };

  button {
    align-self: flex-end;
  }

  .key {
    color: ${props => props.theme.textGrey};
    font-size: 0.7em;
    text-transform: uppercase;
    min-width: 25%;
  }

  .value {
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .end {
    margin-left: auto;
  }

  @media screen and (max-width: 750px) {
    border-bottom: 1px solid ${props => props.theme.lightGrey};

    .avatar{
      width: 100%;
    }

    .avatar, .value {
      text-align: right;
    }
  }
`

const UserInfo = ({ user, edit }) => {
  const history = useHistory()
  const userKeys = Object
    .keys(user)
    .filter(k => k !== 'photo' && k !== 'id')

  return (
    <React.Fragment>
      <ContentField>
        <StyledHeading>
          <h2>Profile</h2>
          <p>some info may be visible to other people</p>
        </StyledHeading>
        {edit && <StyledButton
          className='end'
          onClick={() => history.push('/edit')}
        >
          Edit
        </StyledButton>
        }
      </ContentField>
      <ContentField>
        <p className='key'>photo</p>
        <span className='avatar'>
          <StyledAvatar src={user.photo} />
        </span>
      </ContentField>
      {userKeys.map((k, i) =>
        <ContentField key={k} lastField={i+1 === userKeys.length}>
          <p className='key'>{k}</p>
          <p className='value'>{user[k]}</p>
        </ContentField>
      )}
    </React.Fragment>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object,
  edit: PropTypes.bool
}

export default UserInfo