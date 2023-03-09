import { createTheme } from "@mui/material";

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
  