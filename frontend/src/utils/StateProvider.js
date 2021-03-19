import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from './apiService'

export const AppState = React.createContext()

const errorTypeSetter = newError => {
  const e = {}
  e[newError.type] = newError.error
  return e
}

const assingUserValues = user => {
  return {
    photo: user.avatar ? user.avatar.url : '/public/avatar1.svg',
    email: user.email || '',
    name: user.name || '',
    bio: user.bio || '',
    phone: user.phone || '',
    id: user.id
  }
}

const Provider = props => {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [error, setError] = useState({})

  useEffect(() => {
    const cachedUserJson = window.localStorage.getItem('userAuthAppUser')
    if (cachedUserJson) {
      const u = JSON.parse(cachedUserJson)
      api.setLoggedUser(u)
      setUser(assingUserValues(u.user))
    }
  }, [])

  const createUser = async credentials => {
    try {
      const res = await api.createUser(credentials)
      setUser(assingUserValues(res))
      setError({})
      history.push('/')
    } catch (e) {
      setError(errorTypeSetter(e.response.data))
    }
  }

  const deleteUser = async () => {
    try {
      await api.deleteUser(user.id)
      logout()
    } catch (e) {
      setError(errorTypeSetter({
        type: 'general',
        error: 'Failed to delete account'
      }))
    }
  }

  const getUser = async id => {
    try {
      const res = await api.getUser(id)
      return assingUserValues(res.data)
    } catch (e) {
      setError(errorTypeSetter({
        type: 'general',
        error: 'No user found'
      }))
      history.push('/')
    }
  }

  const login = async credentials => {
    try {
      const res = await api.login(credentials)
      setUser(assingUserValues(res))
      setError({})
      history.push('/')
    } catch (e) {
      setError(errorTypeSetter(e.response.data))
    }
  }

  const loginWithGit = async code => {
    try {
      const res = await api.gitLogin(code)
      setUser(assingUserValues(res))
      setError({})
      history.push('/')
    } catch (e) {
      setError(errorTypeSetter(e.response.data))
      history.push('/')
    }
  }

  const logout = () => {
    api.setLoggedUser(null)
    setUser(null)
    history.push('/')
  }

  const showError = err => {
    setError(errorTypeSetter(err))
  }

  const updateUser = async updated => {
    try {
      const res = await api.updateUser(updated)
      setUser(assingUserValues(res))
      setError({})
      history.push('/')
    } catch (e) {
      setError(errorTypeSetter(e.response.data))
    }
  }

  const uploadImage = async image => {
    try {
      const res = await api.addAvatar(image, user.id)
      setUser({
        ...user,
        photo: res.data.avatar.url
      })
    } catch (e) {
      console.log(e.response)
    }
  }

  return (
    <AppState.Provider value={{
      user,
      error,
      createUser,
      deleteUser,
      getUser,
      login,
      loginWithGit,
      logout,
      showError,
      updateUser,
      uploadImage
    }}>
      {props.children}
    </AppState.Provider>
  )

}

Provider.propTypes = {
  children: PropTypes.element
}

export default Provider