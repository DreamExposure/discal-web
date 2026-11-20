import {useRouter} from "next/router";
import React, {useEffect} from "react";
import Loader from "../components/loader";
import {useRequestSupportLink} from "../lib/service";
import Head from "next/head";

export default function InvitePage() {
    const router = useRouter()
    const requestSupportLink = useRequestSupportLink()

    useEffect(() => {
        // get link and push the client to it
        requestSupportLink().then(response => {
            if (response.success) router.push(response.data)
            else {
                // Route to legacy support link that will hopefully work forever maybe lmao
                router.push("https://discord.gg/2TFqyuy")
            }
        })
    }, [router, requestSupportLink]);

    return <>
        <Head>
            <title>Support - DisCal Bot</title>
        </Head>
        <Loader/>
    </>
}
