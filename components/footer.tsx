import styles from "../styles/Home.module.css";
import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        something: {
            display: 'flex',
        },
        text_stuff: {
            padding: theme.spacing(2),
        }
    }),
);

export default function Footer() {
    const classes = useStyles();

    function BrandingRow() {
        return (
            <React.Fragment>
                <div className={classes.something}>
                    <image>
                        <img src="/logos/dark/transparent/logo.png" width={64} alt="DisCal Logo"/>
                    </image>
                    <div className={classes.text_stuff}>Text</div>
                </div>
            </React.Fragment>
        );
    }

    function LinksRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Box className={classes.paper}>item1</Box>
                </Grid>
                <Grid item xs={4}>
                    <Box className={classes.paper}>item2</Box>
                </Grid>
                <Grid item xs={4}>
                    <Box className={classes.paper}>item3</Box>
                </Grid>
            </React.Fragment>
        );
    }

    function LegalRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Box className={classes.paper}>item1</Box>
                </Grid>
                <Grid item xs={4}>
                    <Box className={classes.paper}>item2</Box>
                </Grid>
                <Grid item xs={4}>
                    <Box className={classes.paper}>item3</Box>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <footer className={styles.footer}>
            <Grid container>
                <Grid container direction={"column"}>
                    <BrandingRow/>
                    <LinksRow/>
                    <LegalRow/>
                </Grid>
            </Grid>
        </footer>
    );
}
