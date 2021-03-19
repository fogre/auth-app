import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { AppState } from '../utils/StateProvider'

const ErrorContainer = styled.div`
  background: white;
  text-align: center;
  color: ${props => props.theme.red};
  z-index: 2;
`

const GeneralError = () => {
  const { error, showError } = useContext(AppState)

  useEffect(() => {
    if (error.general) {
      setTimeout(() => {
        showError({})
      }, 10000)
    }
  }, [error])

  if (error.general) {
    return (
      <ErrorContainer>
        <h3>{error.general}</h3>
      </ErrorContainer>
    )
  }

  return null
}

export default GeneralError