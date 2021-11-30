import styles from "../styles/navbar.module.css";
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Image from "next/image";
import {Container, Link, Typography} from "@mui/material";

export default function Navbar(){
    return (
        <Container maxWidth={false} className={styles.navbar}>
            This is a navbar
        </Container>
    );
}
