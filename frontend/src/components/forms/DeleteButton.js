import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppState } from '../../utils/StateProvider'
import { button } from '../../styles/mixins'

const Button = styled.button`
  ${button}
  background: ${props => props.theme.red}
`

const DeleteButton = () => {
  const { deleteUser } = useContext(AppState)

  return (
    <React.Fragment>
      <Button onClick={() => deleteUser()}>delete</Button>
    </React.Fragment>
  )
}

export default DeleteButton