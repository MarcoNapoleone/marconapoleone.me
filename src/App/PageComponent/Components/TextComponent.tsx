import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 500,
  },
  skeletonText: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  }
}));

type TextComponentProps = {
  title?: string,
  content?: string,
}
const TextComponent: React.FC<TextComponentProps> = (
  {
    title,
    content
  }
) => {
  const classes = useStyles();
  return (
    <Box paddingY={1}>
      <Grid container>
        <Grid item>
          <Typography variant="h5" className={classes.text}>
            {title}
          </Typography>
          <Typography>
            {content}
          </Typography>
        </Grid>
      </Grid>
    </Box>);
}

export default TextComponent;