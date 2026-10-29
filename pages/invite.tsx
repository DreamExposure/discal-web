import {useRouter} from "next/router";
import React, {useEffect} from "react";
import Loader from "../components/loader";
import {useRequestInviteLink} from "../lib/service";
import Head from "next/head";
import {toast} from "react-toastify";

export default function InvitePage() {
    const router = useRouter()
    const requestInviteLink = useRequestInviteLink()

    useEffect(() => {
        // get link and push the client to it
        requestInviteLink().then(response => {
            if (response.success) router.push(response.data)
            else {
                console.log(response.error)
                toast.error("Failed to get invite link... Server must be down")
                router.back()
            }
        })
    }, [router, requestInviteLink]);

    return <>
        <Head>
            <title>Invite - DisCal Bot</title>
        </Head>
        <Loader/>
    </>
}
