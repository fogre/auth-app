import styled, { css } from 'styled-components'

export const border = css`
  border: 0.12em solid ${props => props.theme.borderDark};
  border-radius: 1.5em;
`
export const button = css`
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 0.5em;
  height: 2.7em;

  :hover {
    ${shadow};
  }
`
export const flexAlignCenter = css`
  display: flex;
  align-items: center;
`
export const hover = css`
  :hover {
    cursor: pointer;
    color: ${props => props.theme.buttonBlue};
  }
`
export const lightBorder = css`
  border: 0.12em solid ${props => props.theme.lightGrey};
  border-radius: 1em;
`
export const inputStyles = css`
  ${border}
  border-radius: 0.5em;
  padding: 1em;
  margin-bottom: 1em;
  width: 100%;

  :hover, :focus {
    border-color: ${props => props.theme.buttonBlue}
  }
`
export const shadow = css`
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.2);
`
export const StyledAvatar = styled.img`
  background: ${props => props.theme.borderDark};
  border: 1px solid ${props => props.theme.lightGrey};
  border-radius: 0.3em;
  cursor: pointer;
  width: 50px;
  height: 50px;
`
export const StyledButton = styled.button`
  color: ${props => props.theme.textGrey};
  background: none;
  border: 1px solid ${props => props.theme.borderDark};
  border-radius: 0.6em;
  font-size: 0.9em;
  padding: 0.5em 2em;

  :hover {
    color: ${props => props.theme.buttonBlue};
    border-color: ${props => props.theme.buttonBlue};
  }
`
export const StyledCenteredContainer = styled.div`
  ${flexAlignCenter}
  width: 100%;
  height: 100vh;
  justify-content: center;
`
export const StyledError = styled.p`
  color: ${props => props.theme.red}
`
export const StyledFormField = styled.div`
  margin: 1em 0;

  p {
    font-weight: 400;
  }

  input, textarea {
    width: 60%;
  }

  @media screen and (max-width: 750px) {
    input, textarea {
      width: 100%;
    }
  }  
`
export const StyledHeading = styled.div`
  line-height: 1.3;
  h2{
    margin: 0;
  }

  p {
    color: ${props => props.theme.textGrey};
    font-size: 0.9em;
    margin: 0;
  }
`
export const StyledInput = styled.input`
  ${inputStyles}
`
export const StyledSubmit = styled.button`
  ${button}
  background: ${props => props.theme.buttonBlue};
  width: 100%;
`
export const StyledVisibleWrapper = styled.div`
  display: ${props => props.visible
    ? 'block' : 'none' };
`