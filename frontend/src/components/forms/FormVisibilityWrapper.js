import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ArrowComponent } from '../SvgComponents'
import { flexAlignCenter, StyledVisibleWrapper } from '../../styles/mixins'

const HeadingWrapper = styled.div`
  ${flexAlignCenter}
  cursor: pointer;
  width: 60%;

  :hover {
    color: ${props => props.theme.buttonBlue};
  }

  @media screen and (max-width: 750px) {
    width: 80%;
  }  
`
const ArrowComp = styled(ArrowComponent)`
  transform: ${props => props.$visible
    ? 'rotate(90deg)' : 'rotate(270deg)' };
`

const FormVisibilityWrapper = props => {
  const [visible, setVisible] = useState(false)

  return (
    <React.Fragment>
      <HeadingWrapper onClick={() => setVisible(!visible)} visible={visible}>
        <h3>{props.heading}</h3>
        <ArrowComp $visible={visible} />
      </HeadingWrapper>
      <StyledVisibleWrapper visible={visible}>
        {props.children}
      </StyledVisibleWrapper>
    </React.Fragment>
  )
}

FormVisibilityWrapper.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.element
}

export default FormVisibilityWrapper