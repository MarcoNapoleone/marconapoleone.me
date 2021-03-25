import React, {useContext, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/SearchRounded';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EmojiObjectsRoundedIcon from '@material-ui/icons/EmojiObjectsRounded';
import {Box, Container, Divider, Grid, SwipeableDrawer, Tooltip, Zoom} from "@material-ui/core";
import {ThemeContext} from "../Theme/Theme";

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

const TopBar = () => {
  const {theme, setTheme} = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.toolbar}>
        <Toolbar className={classes.toolbar}>
          <Grid container justify="flex-end">
            <Grid item>
              <Tooltip
                TransitionComponent={Zoom}
                title={theme === 'light' ? "Dark Mode" : "Light Mode"} arrow
              >
                <IconButton onClick={() => {
                  theme === 'light' ?
                    setTheme('dark')
                    : setTheme('light')
                }}>
                  {theme === 'light' ? <EmojiObjectsOutlinedIcon/> : <EmojiObjectsRoundedIcon/>}
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip TransitionComponent={Zoom} title="Search" arrow>
                <IconButton onClick={() => setIsOpen(true)}>
                  <SearchIcon/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        PaperProps={{className: classes.searchDrawer,}}
        className={classes.searchDrawer}
        anchor="bottom"
        open={isOpen}
        onClose={handleClose}
        onOpen={handleClose}
      >
        <Box marginY={1}>
          <Divider className={classes.divider}/>
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
        </Box>
      </SwipeableDrawer>
    </div>
  );
}

export default TopBar;