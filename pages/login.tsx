import {useRouter} from "next/router";
import React, {useEffect} from "react";
import Loader from "../components/loader";
import {useRequestLogin} from "../lib/service";
import Head from "next/head";
import {toast} from "react-toastify";

export default function LoginPage() {
    const router = useRouter()
    const requestLogin = useRequestLogin()

    useEffect(() => {
        // get link and push the client to it
        requestLogin().then(loginResponse => {
            if (loginResponse.success) router.push(loginResponse.data.link)
            else {
                console.log(loginResponse.error)
                toast.error("Failed to get login link... Server must be down")
                router.back()
            }
        })
    }, [requestLogin, router]);

    return <>
        <Head>
            <title>Login - DisCal Bot</title>
        </Head>
        <Loader/>
    </>
}
