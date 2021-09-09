import React from "react";
import {Avatar, Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Icon, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
    imageSmall: {
        borderRadius: theme.shape.borderRadius,
        height: theme.spacing(10),
        width: theme.spacing(10),
    },
    imageBig: {
        borderRadius: '4px 4px 0 0',
        height: theme.spacing(32),
        width: 'auto',
    },
    textTitle: {
        fontWeight: 600,
    },
    textSubtitle: {
        fontWeight: 300,
    },
    icon: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
}));

type ImageComponentProps = {
    page_id?: string,
    size?: string,
}
const ImageComponent: React.FC<ImageComponentProps> = (
    {
        page_id,
        size,
    }
) => {

    const classes = useStyles();
    // @ts-ignore
    return (
        <>
            {
                size === "SMALL"
                    ? <Box paddingY={1}>
                        <Card variant="outlined">
                            <CardActionArea onClick={() => {
                            }}>
                                <Box padding={1}>
                                    <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
                                        <Grid item>
                                            <Avatar variant="square" src="https://thiscatdoesnotexist.com/"
                                                    className={classes.imageSmall}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" className={classes.textTitle}>
                                                This Is A Long Title
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary"
                                                        className={classes.textSubtitle}>
                                                {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.".substring(0, 40)}...
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Icon className={classes.icon}>
                                                <OpenInNewIcon color="action"/>
                                            </Icon>

                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                    : <Box>
                        <Card variant="outlined">
                            <CardActionArea onClick={() => {
                            }}>
                               <CardMedia
                                   className={classes.imageBig}
                                   image="https://thiscatdoesnotexist.com/"
                                   title="Title"
                               />
                                <CardContent>
                                        <Typography variant="h6" className={classes.textTitle} component="h2" >
                                            This Is A Long Title
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" className={classes.textSubtitle} component="p">
                                            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.".substring(0, 50)}...
                                        </Typography>
                                        <Icon className={classes.icon}>
                                            <OpenInNewIcon color="action"/>
                                        </Icon>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
            }
        </>
    );
}

export default ImageComponent;