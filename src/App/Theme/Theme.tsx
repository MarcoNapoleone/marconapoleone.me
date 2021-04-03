import React, {useContext, useState} from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {ThemeProvider} from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import {CssBaseline, PaletteType, ThemeProvider as MuiThemeProvider} from '@material-ui/core';
import {deepOrange, deepPurple, lightBlue, orange} from "@material-ui/core/colors";

type FontType = {
  family?: string,
  size?: number,
}

export const ThemeContext = React.createContext({
  theme: 'light' as string,
  setTheme: (theme: string) => {
  },
  font: {
    family: 'Lexend',
    size: 16,
  } as FontType,
  setFont: (font: FontType) => {
  },
});

const Theme: React.FC = ({children}) => {
  const [theme, setTheme] = useState('light');
  const [font, setFont] = useState({family: 'Lexend, sans-serif', size: 16} as FontType);
  const themeValue = {theme, setTheme, font, setFont};

  const palletType = theme === 'dark' ? 'dark' : 'light';  //if dark set darkTheme else lightTheme for light and sepia
  const mainPrimaryColor = theme === 'light' || theme === 'sepia' ? orange[500] : lightBlue[500];
  const mainSecondaryColor = theme === 'light' || theme === 'sepia' ? deepOrange[900] : deepPurple[500];
  const backgroundPaper = theme === 'light' ? '#ffffff' : theme === 'sepia' ? '#f8f0e3' : '#424242';
  const backgroundDefault = theme === 'light' ? '#fafafa' : theme === 'sepia' ? '#f8f0e3' : '#303030';

  const materialTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      },
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      }
    },
    typography: {
      fontFamily: font.family,
      h6: {
        fontSize: `${font.size * 0.0125}rem`,
      },
      h5: {
        fontSize: `${font.size * 0.015}rem`,
      },
      h4: {
        fontSize: `${font.size * 0.02125}rem`,
      },
      h3: {
        fontSize: `${font.size * 0.03}rem`,
      },
      h2: {
        fontSize: `${font.size * 0.0375}rem`,
      },
      h1: {
        fontSize: `${font.size * 0.06}rem`,
      },
    },
  });
  return (
    <NoSsr>
      <ThemeContext.Provider value={themeValue}>
        <MuiThemeProvider theme={materialTheme}>
          <ThemeProvider theme={materialTheme}>
            <CssBaseline/>
            {children}
          </ThemeProvider>
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </NoSsr>
  );
};

export default Theme;
