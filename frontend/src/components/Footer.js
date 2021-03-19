import React from 'react'
import styled from 'styled-components'
import { flexAlignCenter } from '../styles/mixins'

const FooterContainer = styled.div`
  ${flexAlignCenter}
  font-size: 0.9em;
  color: ${props => props.theme.textGrey};
  width: 100%;
  margin-top: 1em;

  a {
    color: inherit;
  }

  .end {
    margin-left: auto;
  }

  @media screen and (max-width: 750px) {
    padding-top: 2em;
    
    p {
      padding: 1em 3%;
    }
  }
`

const Footer = () => {
  return (
    <FooterContainer>
      <p>created by <a href='https://github.com/fogre/auth-app'
        rel='noopener noreferrer'>fogre</a>
      </p>
      <p className='end'>devChallenges.io</p>
    </FooterContainer>
  )
}

export default Footer