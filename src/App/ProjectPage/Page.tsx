import React, {useContext} from 'react';
import {
  Avatar,
  Box, Card, CardMedia,
  Container, createStyles, Grid, Theme, Typography
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import TopBar from "../Topbar/TopBar";
import {ThemeContext} from "../Theme/Theme";

const useStyles = makeStyles((theme) => ({
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
  return (
    <>
      <TopBar/>
      <Box>
        <Container>
          <Grid container justify="center">
            <Grid item>
              <Box paddingY={16}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Avatar variant="square" src={image} className={classes.image}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3" className={classes.title}>
                      {title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" className={classes.subtitle}>
                      {subtitle}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Page;