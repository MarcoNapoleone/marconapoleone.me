import React from "react";
import {Avatar, Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: theme.shape.borderRadius,
    width: 'auto',
    height: 'auto',

  },
  skeletonImage: {
    borderRadius: theme.shape.borderRadius,
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  caption:{
    fontWeight: 50,
  }
}));

type ImageComponentProps = {
  url?: string,
  credit?: string,
}
const ImageComponent: React.FC<ImageComponentProps> = (
  {
    url,
    credit,
  }
) => {
  const classes = useStyles();
  return (
    <Box paddingY={1}>
      <Grid container justify="center">
        <Grid item>
          <Avatar variant="square" src={url} className={classes.image}/>
        </Grid>
        <Grid item >
          <Typography variant="caption" align="center" className={classes.caption} >
            {credit}
          </Typography>
        </Grid>
      </Grid>
    </Box>);
}

export default ImageComponent;