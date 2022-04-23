import {useRouter} from "next/router";
import React, {useEffect} from "react";
import Loader from "../components/loader";
import {useRequestInviteLink} from "../lib/service";

export default function InvitePage() {
    const router = useRouter()
    const requestInviteLink = useRequestInviteLink()

    useEffect(() => {
        // get link and push the client to it
        requestInviteLink().then(data => {
            router.push(data)
        })
    }, [router, requestInviteLink]);

    return <Loader/>
}
