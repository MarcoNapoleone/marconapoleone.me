import React from 'react';
import {
  Box, Card, CardMedia,
  Container, Grid, Typography
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import TopBar from "../Topbar/TopBar";

const useStyles = makeStyles({
  title: {
    fontWeight: 800,
    fontFamily: 'Lexend , sans-serif',
  },
  subtitle: {
    fontWeight: 400,
    fontFamily: 'Lexend , sans-serif',
  },
  image: {
    height: '100px',
  }
});

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
                    <Card elevation={0}>
                      <CardMedia className={classes.image} image={image}/>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.title}>
                      {title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" className={classes.subtitle}>
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