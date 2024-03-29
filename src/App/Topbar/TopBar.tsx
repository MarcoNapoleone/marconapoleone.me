import React, {useContext, useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/SearchRounded';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import {
  Box, Button,
  Container,
  Divider, Fab,
  Grid,
  ListItemSecondaryAction, Slide, Slider,
  SwipeableDrawer, Switch,
  Tooltip, useScrollTrigger,
  Zoom
} from "@material-ui/core";
import {ThemeContext} from "../Theme/Theme";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.background.default,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  divider: {
    margin: 'auto',
    backgroundColor: fade(theme.palette.text.secondary, 0.15),
    height: '4px',
    maxWidth: '16%',
    borderRadius: '4px',
  },
  topDrawer: {
    margin: 'auto',
    borderRadius: '0 0 15px 15px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '40%',
    },
  },
  bottomDrawer: {
    margin: 'auto',
    borderRadius: '15px 15px 0 0',
    [theme.breakpoints.up('md')]: {
      maxWidth: '40%',
    },
  },
  themeSelected: {
    border: "solid 4px",
    borderColor: theme.palette.primary.main,
  },
  themeSelectorLight: {
    backgroundColor: '#fafafa',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'all 0.3s ease-out',
    '&:hover': {
      backgroundColor: '#fafafa',
      transform: 'scale(1.05)',
    },
  },
  themeSelectorDark: {
    backgroundColor: '#303030',
    color: '#fff',
    transition: 'all 0.3s ease-out',
    '&:hover': {
      backgroundColor: '#303030',
      transform: 'scale(1.05)',
    },
  },
  themeSelectorSepia: {
    backgroundColor: '#ffe8c0',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'all 0.3s ease-out',
    '&:hover': {
      backgroundColor: '#ffe8c0',
      transform: 'scale(1.05)',
    },
  },
  fontSelected: {
    backgroundColor: fade(theme.palette.primary.main, 0.3),
    color: theme.palette.primary.main,
  },
  toolbar: {
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.text.secondary, 0.10),
    '&:hover': {
      backgroundColor: fade(theme.palette.text.secondary, 0.15),
    },
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon/>
      </div>
      <InputBase
        autoFocus
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{'aria-label': 'search'}}
      />
    </div>
  );
}

type ThemeDrawerProps = {
  open: boolean,
  onClose: () => void,
  onOpen: () => void,
}
const ThemeDrawer: React.FC<ThemeDrawerProps> = (
  {
    open,
    onClose,
    onOpen,
  }
) => {
  const {theme, setTheme, font, setFont} = useContext(ThemeContext);
  const [fontSize, setFontSize] = React.useState<number>(100);
  const [isThemeSystemDefault, setIsThemeSystemDefault] = React.useState(true);
  const getSystemTheme = () => {
    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    let systemTheme;
    if (getCurrentTheme()) {
      systemTheme = 'dark';
    } else {
      systemTheme = 'light';
    }
    return systemTheme;
  }
  useEffect(() => {
    if (isThemeSystemDefault) {
      setTheme(getSystemTheme());
    }
  }, [isThemeSystemDefault]);
  const handleThemeSelection = (selectedTheme: string) => {
    setTheme(selectedTheme);
    if (isThemeSystemDefault) {
      setIsThemeSystemDefault(false);
    }
  }
  const handleFontChange = (event: any, newValue: number | number[]) => {
    setFontSize(newValue as number)
  };
  useEffect(() => {
    setFont({size: fontSize, family: font.family})
  }, [fontSize])
  const classes = useStyles();
  return (
    <SwipeableDrawer
      PaperProps={{className: classes.bottomDrawer,}}
      className={classes.bottomDrawer}
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableDiscovery
      disableSwipeToOpen
    >
      <Box marginTop={1} marginBottom={2}>
        <Divider className={classes.divider}/>
      </Box>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Font
            </Typography>
            <Divider/>
            <Box paddingY={2}>
              <Grid container alignItems="center" justify="center">
                <Grid item>
                  <Typography color="textSecondary">
                    {fontSize === 100 ? "100% (default)" : `${fontSize}%`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" justify="space-evenly">
                <Grid item>
                  <Typography color="textSecondary">
                    <TextFieldsIcon color="inherit"/>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    value={fontSize}
                    onChange={handleFontChange}
                    step={10}
                    marks
                    aria-labelledby="font-size"
                    defaultValue={100}
                    min={80}
                    max={140}
                  />
                </Grid>
                <Grid item>
                  <Typography color="textSecondary">
                    <TextFieldsIcon color="inherit"/>
                  </Typography>
                </Grid>
              </Grid>
              <Box paddingY={2}>
                <Grid container alignItems="center" justify="center" spacing={1}>
                  <Grid item xs={3}>
                    <Button
                      fullWidth
                      color={font.family === 'Lexend, sans-serif' ? 'primary' : 'default'}
                      variant="outlined"
                      onClick={() => setFont({family: 'Lexend, sans-serif'})}
                      style={{
                        fontFamily: 'Lexend, sans-serif',
                        transition: 'color border 0.5s ease-out',
                      }}
                    >
                      Default
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      fullWidth
                      color={font.family === 'Playfair Display, serif' ? 'primary' : 'default'}
                      variant="outlined"
                      onClick={() => setFont({family: 'Playfair Display, serif'})}
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        transition: 'color border 0.5s ease-out',
                      }}
                    >
                      Serif
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      fullWidth
                      color={font.family === 'Roboto Mono, monospace' ? 'primary' : 'default'}
                      variant="outlined"
                      onClick={() => setFont({family: 'Roboto Mono, monospace'})}
                      style={{
                        fontFamily: 'Roboto Mono, monospace',
                        transition: 'color border 0.5s ease-out',
                      }}
                    >
                      Mono
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Theme
            </Typography>
            <Divider/>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FormatPaintIcon/>
                </ListItemIcon>
                <ListItemText primary="Use system theme"/>
                <ListItemSecondaryAction>
                  <Switch
                    edge="start"
                    color="primary"
                    onChange={() => setIsThemeSystemDefault(!isThemeSystemDefault)}
                    checked={isThemeSystemDefault}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Box paddingBottom={3} paddingTop={1}>
              <Grid container spacing={4} alignItems="center" justify="center">
                <Grid item>
                  <Fab
                    className={`${theme === 'light' ? classes.themeSelected : ''} ${classes.themeSelectorLight}`}
                    onClick={() => handleThemeSelection('light')}
                  >
                    <TextFormatIcon/>
                  </Fab>
                </Grid>
                <Grid item>
                  <Fab
                    className={`${theme === 'sepia' ? classes.themeSelected : ''} ${classes.themeSelectorSepia}`}
                    onClick={() => handleThemeSelection('sepia')}
                  >
                    <TextFormatIcon/>
                  </Fab>
                </Grid>
                <Grid item>
                  <Fab
                    className={`${theme === 'dark' ? classes.themeSelected : ''} ${classes.themeSelectorDark}`}
                    onClick={() => handleThemeSelection('dark')}
                  >
                    <TextFormatIcon/>
                  </Fab>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </SwipeableDrawer>
  );
}

type SearchDrawerProps = {
  open: boolean,
  onClose: () => void,
  onOpen: () => void,
}
const SearchDrawer: React.FC<SearchDrawerProps> = (
  {
    open,
    onClose,
    onOpen,
  }
) => {
  const classes = useStyles();
  return (
    <SwipeableDrawer
      PaperProps={{className: classes.topDrawer,}}
      className={classes.topDrawer}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      anchor="top"
      disableDiscovery
      disableSwipeToOpen
    >
      <SearchBar/>
      <Box marginTop={1} marginBottom={1}>
        <Divider className={classes.divider}/>
      </Box>
    </SwipeableDrawer>
  );
}


const TopBar: React.FC = ({children}) => {
  const trigger = useScrollTrigger();
  const [isOpenTheme, setIsOpenTheme] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">
                  <Logo/>
                </Typography>
              </Grid>
              <Grid item>
                <Grid container justify="flex-end" spacing={2}>
                  <Grid item>
                    <Tooltip TransitionComponent={Zoom} title="Page theme" arrow>
                      <IconButton onClick={() => setIsOpenTheme(true)}>
                        <TextFieldsIcon/>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip TransitionComponent={Zoom} title="Search" arrow>
                      <IconButton
                        onClick={() => setIsOpenSearch(true)}>
                        <SearchIcon/>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar/>
      <ThemeDrawer
        open={isOpenTheme}
        onClose={() => setIsOpenTheme(false)}
        onOpen={() => setIsOpenTheme(true)}
      />
      <SearchDrawer
        open={isOpenSearch}
        onClose={() => setIsOpenSearch(false)}
        onOpen={() => setIsOpenSearch(true)}
      />
      {children}
    </div>
  );
}

const Logo = () => {
  return (
    <svg style={{marginTop: '7px'}} width="50" height="50" viewBox='0 0 177 100' fill='none'
         xmlns='http://www.w3.org/2000/svg'>
      <circle cx='72' cy='50' r='30' fill='#68DBFF'/>
      <ellipse cx='104.647' cy='50' rx='29.7059' ry='30' fill='#FF7917'/>
      <path fill-rule='evenodd' clip-rule='evenodd'
            d='M88.4039 75.1221C96.5911 69.7652 102 60.5143 102 50C102 39.4858 96.5911 30.2348 88.4039 24.878C80.2971 30.2348 74.9412 39.4858 74.9412 50C74.9412 60.5143 80.2971 69.7652 88.4039 75.1221Z'
            fill='#5D2C02'/>
    </svg>
  );
}

export default TopBar;