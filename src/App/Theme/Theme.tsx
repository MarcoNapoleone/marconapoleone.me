import React, {useContext, useState} from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {ThemeProvider} from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import {CssBaseline, PaletteType, ThemeProvider as MuiThemeProvider} from '@material-ui/core';
import {deepOrange, deepPurple, lightBlue, orange} from "@material-ui/core/colors";


export const ThemeContext = React.createContext({
  theme: 'light' as PaletteType,
  setTheme: (theme: PaletteType) => {
  },
});

const Theme: React.FC = ({children}) => {
  const [theme, setTheme] = useState('light' as PaletteType);
  const themeValue = {theme, setTheme};

  const palletType = theme;
  const mainPrimaryColor = theme === 'light' ? orange[500] : lightBlue[500];
  const mainSecondaryColor = theme === 'light' ? deepOrange[900] : deepPurple[500];
  const materialTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    },
    typography: {
      fontFamily: 'Lexend , sans-serif',
    },
    /*props: {
      MuiToolbar: {
        variant: 'dense',
      },
    },
    overrides: {
      MuiAppBar: {
        root: {
          paddingTop: 'env(safe-area-inset-top)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        },
      },
      MuiDrawer: {
        root: {
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingRight: 'env(safe-area-inset-right)',
        },
      },
      MuiDialog: {
        paperFullScreen: {
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        },
      },
      MuiListItem: {
        root: {
          fontFamily: 'Roboto, RobArial',
        },
      },
      MuiInput: {
        input: {
          fontFamily: 'Roboto, RobArial',
        },
      },
      MuiOutlinedInput: {
        input: {
          fontFamily: 'Roboto, RobArial',
        },
      },
    },*/
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
