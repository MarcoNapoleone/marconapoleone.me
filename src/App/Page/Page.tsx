import React, {useContext, useEffect, useState} from 'react';
import {
  Avatar,
  Box, Breadcrumbs, Chip,
  Container, Grid, IconButton, Link, Typography
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
import ShareButton from "../ShareButton/ShareButton";
import PageComponent from "../PageComponent/PageComponent";

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

const getDateFromTStamp = (tTime: string) =>{
  const date = new Date(Number(tTime));
  return(`${date.getMonth()}/${date.getDay()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`);
}

export type PageProps = {
  title?: string,
  subtitle?: string,
  image?: string,
  tags?: string[],
  created_at?: string,
  children?: string[],
  loading?: boolean,
};
const Page: React.FC<PageProps> = (
  {
    title,
    subtitle,
    image,
    tags,
    created_at,
    children,
    loading,
  }
) => {
  const classes = useStyles();
  const location = useLocation();
  const shareData = {
    title: title,
    text: subtitle,
    url: 'https://marconapoleone.me' + location.pathname,
  };
  console.log(created_at);
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
                      : title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" className={classes.subtitle}>
                    {loading
                      ? <Skeleton
                        animation="wave"
                        width="60%"
                      />
                      : subtitle}
                  </Typography>
                </Grid>
                <Grid item>
                  {
                    loading ? <Skeleton
                        animation="wave"
                        width="60%"
                      />
                      : <Grid container spacing={1} alignContent="center" justify="flex-start">
                        <Grid item>
                          <Typography color="textSecondary" variant="caption">
                            <ScheduleIcon fontSize="small" color="inherit"/>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography color="textSecondary" variant="caption">
                            {getDateFromTStamp(created_at)}
                          </Typography>
                        </Grid>
                      </Grid>
                  }
                </Grid>
                <Grid item>
                  {loading
                    ? <Skeleton
                      variant="text"
                      animation="wave"
                      width="20%"
                    />
                    : <Grid container spacing={1}>
                      {tags?.map((tag: string) => (
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
                  {children?.map((child: string) => (<PageComponent content={child}/>))}
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