import 'styles/global.css'
import { AppProps } from "next/app";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "components/NavBar";

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

const navBarProps = {
  elements: [
    { title: "Grade", route: "/" },
    { title: "Register", route: "/register"}
  ]
}

export default function MyApp({Component, pageProps} : AppProps) : JSX.Element {
  return (
    <ThemeProvider theme={THEME}>
      <div className="navbar">
        <NavBar {...navBarProps} />
      </div>
      <Component {...pageProps} />  
    </ThemeProvider>
  )
}

