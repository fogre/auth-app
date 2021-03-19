import React from 'react'
import styled from 'styled-components'
import ArrowSVG from '../assets/arrow.svg'
import DropdownSVG from '../assets/dropdown.svg'
import ExitSvg from '../assets/exit.svg'
import GithubSVG from '../assets/Gihub.svg'
import LogoSVG from '../assets/devchallenges.svg'

export const ArrowComponent = styled(ArrowSVG)`
  .arrow {
    fill: ${props => props.theme.linkBlue};
  }
`
export const ExitComponent = styled(ExitSvg)`
  .path {
    fill: ${props => props.theme.red}
  }
`
export const GHlogoComponent = styled(GithubSVG)`
  margin: 0.5em;
  
  :hover {
    cursor: pointer;

    .path {
      fill: ${props => props.theme.buttonBlue};
    }

    .circle {
      stroke: ${props => props.theme.buttonBlue};
    }
  }
`
export const DropdownComponent = styled(DropdownSVG)`
  transform: ${props => props.$visible
    ? 'rotate(180deg)' : ''};
`
export const LogoComponent = () => <LogoSVG />