import type { AppProps } from "next/app";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import GlobalStyle from "@/components/globalstyles";
import localFont from "@next/font/local"

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};
const myFont = localFont({src: "../fonts/Barlow-Regular.ttf"})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <main className={myFont.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}
