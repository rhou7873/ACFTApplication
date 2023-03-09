import 'styles/global.css'
import { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "components/NavBar";
import { THEME } from "lib/config";
import Role from "types/role";
import { useEffect } from "react";

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

