import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import App from './App'

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    font-family: 'Catamaran', sans-serif;
    font-size: 16px;
    margin: 0;
    width: auto;
  }

  p {
    font-weight: 300;
  }

  a {
    cursor: pointer;
    color: ${props => props.theme.linkBlue};
  }

  h1,h2,h3,h4 {
    font-weight: 500;
  }

  button, input {
    display: block;
    box-sizing: border-box;
    outline: none;
  }
`

const theme = {
  borderDark: '#b8b8b8',
  lightGrey: '#525252',
  textGrey: '#525252',
  buttonBlue: '#3d7de3',
  linkBlue: '#0b81d6',
  red: '#ed4a4f'
}

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </>,
  document.getElementById('root')
)