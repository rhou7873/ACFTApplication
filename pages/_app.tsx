import 'styles/global.css'
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "lib/config";
import { setCookie } from "cookies-next";

export default function MyApp({Component, pageProps} : AppProps) : JSX.Element {
  return (
    <ThemeProvider theme={THEME}>
      <Component {...pageProps} />  
    </ThemeProvider>
  )
}

