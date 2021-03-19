import React, {
  useState,
  useEffect,
  useContext
} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AppState } from '../utils/StateProvider'
import { ArrowComponent } from './SvgComponents'
import Footer from './Footer'
import UserForm from './forms/UserForm'
import UserInfo from './UserInfo'
import { flexAlignCenter, lightBorder } from '../styles/mixins'

const UserContainer = styled.div`
  ${flexAlignCenter}
  flex-direction: column;
`
const HeadingWrapper = styled.div`
  text-align: center;
  margin-bottom: 1em;
  h1, p {
    margin: 0;
    line-height: 1;
  }
`
const ContentContainer = styled.div`
  width: 50vw;
  max-width: 800px;

  @media screen and (max-width: 750px) { 
    border: none;
    width: 100%;
  }
`
const UserFieldWrapper = styled.div`
  ${lightBorder}
  margin-top: 0.5em;

  @media screen and (max-width: 750px) { 
    border: none;
  }
`
const ButtonWrapper = styled(UserFieldWrapper)`
  border: none;
  padding-left 0.8em;
  margin-top: 2.7em;

  button {
    ${flexAlignCenter}
    background: none;
    border: none;
    color: ${props => props.theme.linkBlue};
    cursor: pointer;
    font-size: 1.05em;
  }
`
const UserInfoContainer = ({ user, edit }) => {
  return (
    <React.Fragment>
      <HeadingWrapper>
        <h1>Personal info</h1>
        <p>Basic info, like your name and photo</p>
      </HeadingWrapper>
      <UserFieldWrapper>
        <UserInfo user={user} edit={edit} />
      </UserFieldWrapper>
    </React.Fragment>
  )
}

const UserEditContainer = ({ user }) => {
  const history = useHistory()

  return (
    <React.Fragment>
      <ButtonWrapper>
        <button onClick={() => history.goBack()}>
          <ArrowComponent />
          <p>back</p>
        </button>
      </ButtonWrapper>
      <UserFieldWrapper>
        <UserForm user={user} />
      </UserFieldWrapper>
    </React.Fragment>
  )
}

const UserScreen = props => {
  const [user, setUser] = useState({ ...props.user })
  const { getUser } = useContext(AppState)
  const userId = useParams().id

  useEffect(async () => {
    if (userId) {
      const u =  await getUser(userId)
      if (u && u.id) {
        setUser(u)
      }
    } else {
      setUser({ ...props.user })
    }
  }, [userId, props.user])

  if (props.edit) {
    return (
      <UserContainer>
        <ContentContainer>
          <UserEditContainer user={user}/>
          <Footer />
        </ContentContainer>
      </UserContainer>
    )
  }

  return (
    <UserContainer>
      <ContentContainer>
        <UserInfoContainer
          edit={userId
            ? (props.user && props.user.id === userId) ? true : false
            : true
          }
          user={user}
        />
        <Footer />
      </ContentContainer>
    </UserContainer>
  )
}

const proptypes = {
  user: PropTypes.object.isRequired,
  edit: PropTypes.bool
}

UserScreen.propTypes,
UserInfoContainer.propTypes,
UserEditContainer.propTypes = proptypes

export default UserScreen