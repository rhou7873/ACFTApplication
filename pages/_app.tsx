import 'styles/global.css'
import { AppProps } from "next/app";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const THEME = createTheme({
  typography: {
    fontFamily: "Overpass"
  },
  palette: {
    primary: {
      light: '#ffffff',
      main: '#030000',
      dark: '#030000',
      contrastText: "#ffffff"
    },
    secondary: {
      light: '#ffffff',
      main: "#ffd530",
      dark: '#030000',
      contrastText: "#030000"
    }
  }
});

export default function MyApp({Component, pageProps} : AppProps) : JSX.Element {
  return (
    <ThemeProvider theme={THEME}>
      <Component {...pageProps} />  
    </ThemeProvider>
  )
}

