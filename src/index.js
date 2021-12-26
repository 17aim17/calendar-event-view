import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import App from './App';

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',

    },
    fontFamily: [
      'Work Sans',
      'sans-serif',
      'Helvetica Neue',
      'Apple Color Emoji',
      'Arial',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    background: {
      default: "#fff",
    },
    text: {
      // default: "#222f3e"
      default: "#555",
      primary: '#555',
      secondary: '#a09999'
    },
    primary: {
      // main: '#222f3e'
      // main: '#1e272e',
      main: '#272727',
    },
    secondary: {
      // main: '#f9ca24',
      main: '#ffd063',
    },
    info: {
      main: '#fff'
    },
    success: {
      main: '#2ecc71'
    },
    error: {
      main: '#e84118'
    },
    warning: {
      main: '#f39c12'
    }
  },
  shadows: Array(25).fill("none"),
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: '#ebebebfc'
      }
    },
    MuiButton: {
      root: {
        borderRadius: 100,

      },
    },
  },
  props: {
    // Name of the component ⚛️
    // MuiButtonBase: {
    // The properties to apply
    // disableRipple: true, // No more ripple, on the whole application 💣!
    // },
  },
  // transitions: {
  //   // So we have `transition: none;` everywhere
  //   create: () => 'none',
  // },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
