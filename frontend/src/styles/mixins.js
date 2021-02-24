import styled, { css } from 'styled-components'

export const border = css`
  border: 0.12em solid ${props => props.theme.borderDark};
  border-radius: 1.5em;
`
export const StyledError = styled.p`
  color: ${props => props.theme.red}
`
export const StyledInput = styled.input`
  ${border}
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-position: 3% 45%;
  background-size: 1.5em;
  text-indent: ${props => props.background ? '1.7em' : 'none'};
  border-radius: 0.5em;s
  padding: 1em;
  margin-bottom: 1em;
  width: 100%;

  :hover, :focus {
    border-color: ${props => props.theme.buttonBlue}
  }
`
export const StyledLink = styled.a.attrs(() => ({
  rel: 'noopener noreferrer',
  target: '_blank'
}))`


`
export const StyledSubmit = styled.button`
  background: ${props => props.theme.buttonBlue};
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 0.5em;
  height: 2.7em;
  width: 100%;

  :hover {
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.42);
  }
`