import {useRouter} from "next/router";
import React, {useEffect} from "react";
import Loader from "../components/loader";
import {useRequestLogin} from "../lib/service";
import Head from "next/head";

export default function LoginPage() {
    const router = useRouter()
    const requestLogin = useRequestLogin()

    useEffect(() => {
        // get link and push the client to it
        requestLogin().then(loginResponse => {
            router.push(loginResponse.link)
        })
    }, [requestLogin, router]);

    return <>
        <Head>
            <title>Login - DisCal Bot</title>
        </Head>
        <Loader/>
    </>
}
