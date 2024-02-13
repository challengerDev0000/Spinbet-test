import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin: 0;
    font-family: 'Barlow';
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  p {
    margin: 0px;
    color: white;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
