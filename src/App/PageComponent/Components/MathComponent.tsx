import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";

type MathComponentProps = {
  content?: string,
}
const Latex = require('react-latex');
const MathComponent: React.FC<MathComponentProps> = (
  {
    content
  }
) => {
  return (
    <Box paddingY={1}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Latex displayMode={true}>{'$' + content.replaceAll("/","\\") + '$'}</Latex>
        </Grid>
      </Grid>
    </Box>);
}

export default MathComponent;