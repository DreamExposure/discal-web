import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {NextPage} from "next";
import {Const} from "../lib/utils";
import {useRequestJson} from "../lib/client";
import Container from "../components/container";
import Loader from "../components/loader";
import type {LoginResponse} from "../lib/types";

function RedirectHandler(): JSX.Element {
    const router = useRouter()
    const requestJson = useRequestJson()

    useEffect(() => {
        // get link and push the client to it
        requestJson('GET', Const.CAM_URL + '/oauth2/discord/login').then(data => {
            const response = data as LoginResponse

            router.push(response.link)
        })
    }, []);

    return <Loader/>
}

const Login: NextPage = () => {

    return <Container>
        <RedirectHandler/>
    </Container>
}

export default Login
