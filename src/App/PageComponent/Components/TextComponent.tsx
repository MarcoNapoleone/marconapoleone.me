import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    textTitle: {
        fontWeight: 600,
    },
    textContent: {
        fontWeight: 300,
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
                    <Typography variant="h5" className={classes.textTitle} gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" className={classes.textContent}>
                        {content}
                    </Typography>
                </Grid>
            </Grid>
        </Box>);
}

export default TextComponent;