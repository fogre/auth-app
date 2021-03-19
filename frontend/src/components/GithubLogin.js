import React, { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AppState } from '../utils/StateProvider'
import { StyledCenteredContainer } from '../styles/mixins'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const GithubLogin = () => {
  const query = useQuery()
  const { loginWithGit } = useContext(AppState)

  useEffect(() => {
    const code = query.get('code')
    if (code) {
      loginWithGit(code)
    }
  }, [])

  return (
    <StyledCenteredContainer>
      <h1>processing...</h1>
    </StyledCenteredContainer>
  )
}

export default GithubLogin