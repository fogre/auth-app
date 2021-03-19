import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import StateProvider from './utils/StateProvider'
import App from './App'

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    font-family: 'Catamaran', sans-serif;
    font-size: 16.3px;
    line-height: 1.5;
    margin: 0;
    width: auto;
  }

  p {
    font-weight: 300;
    margin: 0;
  }

  a {
    cursor: pointer;
    color: ${props => props.theme.linkBlue};
  }

  h1 {
    padding: 0;
  }

  h1,h2,h3,h4 {
    font-weight: 400;
  }

  button {
    cursor: pointer;
  }

  button, input, textarea {
    box-sizing: border-box;
    display: block;
    font: inherit;
    font-size: 0.9em;
    font-weight: 300;
    outline: none;
  }
`

const theme = {
  borderDark: '#b8b8b8',
  lightGrey: '#d1d1d1',
  textGrey: '#707070',
  buttonBlue: '#3d7de3',
  linkBlue: '#0b81d6',
  red: '#ed4a4f'
}

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <StateProvider>
          <App />
        </StateProvider>
      </Router>
    </ThemeProvider>
  </>,
  document.getElementById('root')
)