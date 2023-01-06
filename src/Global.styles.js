import { createGlobalStyle } from 'styled-components'

export const colors = {
  background: '#17111a',
  dark: '#050404',
  light: '#fdfdfd',
  primary: '#7a213a'
}

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: inherit;
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  body {
    color: ${colors.light};
    font-family: 'Nunito', sans-serif;
    font-size: 1.6rem;
    margin: 0;
    min-height: 100vh;
    user-select: none;
  }

  button {
    font-size: inherit;
    border: none;
    outline: none;
  }
`

export default GlobalStyles
