import {useRouter} from "next/router";
import React, {useEffect} from "react";
import Loader from "../components/loader";
import {useRequestLogin} from "../lib/service";
import Head from "next/head";

export default function LoginPage() {
    const router = useRouter()
    const requestLogin = useRequestLogin()

    // TODO: clean this up, bring in line with new patterns established in calendar embed page
    useEffect(() => {
        // get link and push the client to it
        requestLogin().then(loginResponse => {
            router.push(loginResponse.data.link)
        })
    }, [requestLogin, router]);

    return <>
        <Head>
            <title>Login - DisCal Bot</title>
        </Head>
        <Loader/>
    </>
}
