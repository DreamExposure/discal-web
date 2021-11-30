import styles from "../styles/footer.module.css";
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Image from "next/image";
import {Container, Link, Typography} from "@mui/material";

export default function Footer() {

    function BrandingRow() {
        return (
            <Grid container direction={"column"} alignItems="flex-start">
                <Grid item>
                    <Image
                        src="/logos/light/transparent/logo-type.png" width={235} height={64}
                        alt="DisCal Logo"
                    />
                </Grid>
                <Grid item>
                    <Typography variant={"subtitle1"} className={'white-text'}>
                        The Ultimate Calendar Bot
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    function LinksRow() {
        return (
            <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <Typography variant={"h5"} className={'white-text'}>
                        DisCal
                    </Typography>
                </Grid>
                <Grid item>
                    <Link href="#" underline="hover">
                        <Typography variant="body1" className="discal-light-gray-text">
                            Premium
                        </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="hover">
                        <Typography variant="body1" className="discal-light-gray-text">
                            Commands
                        </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="hover">
                        <Typography variant="body1" className="discal-light-gray-text">
                            Invite
                        </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="hover">
                        <Typography variant="body1" className="discal-light-gray-text">
                            Support
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        );
    }

    function DevelopersRow() {
        return (
            <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <Typography variant={"h5"} className={'white-text'}>
                        Developers
                    </Typography>
                </Grid>
                <Grid item>
                    <Link href="#" underline="hover">
                        <Typography variant="body1" className="discal-light-gray-text">
                            API
                        </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="hover">
                        <Typography variant="body1" className="discal-light-gray-text">
                            GitHub
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        );
    }

    function LegalRow() {
        return (
            <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <Typography variant={"h5"} className={'white-text'}>
                        Legal
                    </Typography>
                </Grid>
                <Grid item>
                    <Link href="#" underline="hover">
                        <Typography variant="body1" className="discal-light-gray-text">
                            Terms of Service
                        </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="hover">
                        <Typography variant="body1" className="discal-light-gray-text">
                            Privacy Policy
                        </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" underline="hover">
                        <Typography variant="body1" className="discal-light-gray-text">
                            Contact
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        );
    }

    function TechRow() {
        return (
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="body1" className="discal-light-gray-text">
                        Copyright © 2017 - {new Date().getFullYear()} DreamExposure Studios - Licensed under GPLv3.
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    return (
        <Container maxWidth={false} className={styles.footer}>
            <Grid container spacing={2}>
                <Grid item container alignItems="flex-start" spacing={4}>
                    <Grid item xs={12} md={8}>
                        <BrandingRow/>
                    </Grid>
                    <Grid item xs={12} sm>
                        <LinksRow/>
                    </Grid>
                    <Grid item xs={12} sm>
                        <DevelopersRow/>
                    </Grid>
                    <Grid item xs={12} sm>
                        <LegalRow/>
                    </Grid>
                </Grid>

                <Grid item container>
                    <TechRow/>
                </Grid>
            </Grid>

        </Container>
    );
}
