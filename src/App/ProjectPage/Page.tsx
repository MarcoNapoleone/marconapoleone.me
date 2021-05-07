import React, {useContext, useEffect, useState} from 'react';
import {
  Avatar,
  Box, Chip,
  Container, Grid, IconButton, Typography
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import TopBar from "../Topbar/TopBar";
import ScheduleIcon from '@material-ui/icons/Schedule';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import {db} from "../../services/firestore";
import {ThemeContext} from "../Theme/Theme";
import {Router} from "@material-ui/icons";
import {useLocation} from 'react-router-dom'
import {Skeleton} from "@material-ui/lab";
import ShareButton from "../share/ShareButton";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontWeight: 800,
  },
  subtitle: {
    fontWeight: 400,
  },
  image: {
    borderRadius: theme.shape.borderRadius,
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  skeletonImage: {
    borderRadius: theme.shape.borderRadius,
    width: theme.spacing(10),
    height: theme.spacing(10),
  }
}));

export type PageProps = {
  title?: string,
  subtitle?: string,
  image?: string,
};
const Page: React.FC<PageProps> = (
  {
    title,
    subtitle,
    image,
    children,
  }
) => {
  const classes = useStyles();
  const [page, setPage] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const shareData = {
    title: page?.title,
    text: page?.subtitle,
    url: 'https://marconapoleone.me' + location.pathname,
  };
  const fetchPages = () => {
    db.collection('pages')
      .doc((location.pathname).replace('/', ''))
      .get()
      .then((doc) => {
        setPage(doc.data());
      })
      .finally(() => {
        setLoading(false)
      });
  }
  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <TopBar>
      <Container>
        <Grid container justify="center">
          <Grid item xs={12} sm={6}>
            <Box paddingY={16}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  {loading
                    ? <Skeleton
                      animation="wave"
                      variant="rect"
                      className={classes.skeletonImage}
                    />
                    : <Avatar variant="square" src={image} className={classes.image}/>
                  }
                </Grid>
                <Grid item>
                  <Typography variant="h3" className={classes.title}>
                    {loading
                      ? <Skeleton
                        animation="wave"
                        width="80%"
                      />
                      : page?.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" className={classes.subtitle}>
                    {loading
                      ? <Skeleton
                        animation="wave"
                        width="60%"
                      />
                      : page?.subtitle}
                  </Typography>
                </Grid>
                <Grid item>
                  {loading ?? <Grid container spacing={1} alignContent="center" justify="flex-start">
                    <Grid item>
                      <Typography color="textSecondary" variant="caption">
                        <ScheduleIcon fontSize="small" color="inherit"/>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography color="textSecondary" variant="caption">
                        11/01/2020 - 12:30am
                      </Typography>
                    </Grid>
                  </Grid>}
                </Grid>
                <Grid item>
                  {loading
                    ? <Skeleton
                      variant="text"
                      animation="wave"
                      width="20%"
                    />
                    : <Grid container spacing={1}>
                      {page?.tags.map((tag: string) => (
                        <Grid item>
                          <Chip size="small" label={tag} variant="outlined"/>
                        </Grid>
                      ))}
                    </Grid>}
                </Grid>
                <Grid item>
                  <ShareButton data={shareData}/>
                </Grid>
                <Grid item>
                  {children}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </TopBar>
  )
}

export default Page;