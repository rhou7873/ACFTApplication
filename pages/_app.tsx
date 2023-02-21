import 'styles/global.css'
import { AppProps } from "next/app";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const THEME = createTheme({
  typography: {
    fontFamily: "Overpass"
  }
});

export default function MyApp({Component, pageProps} : AppProps) : JSX.Element {
  return (
    <ThemeProvider theme={THEME}>
      <Component {...pageProps} />  
    </ThemeProvider>
  )
}

