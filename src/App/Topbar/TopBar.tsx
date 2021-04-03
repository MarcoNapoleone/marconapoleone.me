import React, {ReactEventHandler, useContext, useEffect, useState} from 'react';
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
  Box, Button, ButtonGroup,
  Container,
  Divider, Fab,
  Grid,
  ListItemSecondaryAction, Slider,
  SwipeableDrawer, Switch,
  Tooltip,
  Zoom
} from "@material-ui/core";
import {ThemeContext} from "../Theme/Theme";
import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //transition: 'all 0.3s ease-out',
  },
  divider: {
    margin: 'auto',
    backgroundColor: fade(theme.palette.text.secondary, 0.15),
    height: '4px',
    maxWidth: '16%',
    borderRadius: '4px',
  },
  searchDrawer: {
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
    margin: theme.spacing(2),
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

type SearchDrawerProps = {}
const SearchBar: React.FC<SearchDrawerProps> = (
  {}
) => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon/>
      </div>
      <InputBase
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
      PaperProps={{className: classes.searchDrawer,}}
      className={classes.searchDrawer}
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
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
                  <Box color="textSecondary">
                    <TextFieldsIcon color="inherit"/>
                  </Box>
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
                <Grid container alignItems="center" justify="center" spacing={2}>
                  <Grid item xs={3}>
                    <Button
                      fullWidth
                      color={font.family === 'Lexend, sans-serif' ? 'primary' : 'default'}
                      variant="outlined"
                      onClick={() => setFont({family:'Lexend, sans-serif'})}
                      style={{fontFamily: 'Lexend, sans-serif', transition: 'color border 0.5s ease-out',}}
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
                      style={{fontFamily: 'Playfair Display, serif', transition: 'color border 0.5s ease-out',}}
                    >
                      Serif
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      fullWidth
                      color={font.family === 'Roboto Mono, monospace' ? 'primary' : 'default'}
                      variant="outlined"
                      onClick={() => setFont({family:'Roboto Mono, monospace'})}
                      style={{fontFamily: 'Roboto Mono, monospace', transition: 'color border 0.5s ease-out',}}
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

const TopBar = () => {
  const [isOpenThemeDrawer, setIsOpenThemeDrawer] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.toolbar}>
        <Toolbar className={classes.toolbar}>
          <Grid container justify="flex-end">
            <Grid item>
              <Tooltip TransitionComponent={Zoom} title="Search" arrow>
                <IconButton onClick={() => setIsOpenSearch(true)}>
                  <SearchIcon/>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip TransitionComponent={Zoom} title="Page theme" arrow>
                <IconButton onClick={() => setIsOpenThemeDrawer(true)}>
                  <TextFieldsIcon/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <ThemeDrawer
        open={isOpenThemeDrawer}
        onClose={() => setIsOpenThemeDrawer(false)}
        onOpen={() => setIsOpenThemeDrawer(true)}
      />
      <SwipeableDrawer
        open={isOpenSearch}
        onClose={() => setIsOpenSearch(false)}
        onOpen={() => setIsOpenSearch(true)}
        anchor="left"
        variant="persistent"
      >
        <SearchBar/>
      </SwipeableDrawer>
    </div>
  );
}

export default TopBar;