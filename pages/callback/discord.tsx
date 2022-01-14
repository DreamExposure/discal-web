import type { NextPage } from 'next'
import React, {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import Session from "../../lib/object/session";
import SessionContext from "../../lib/context";
import {Const, StorageUtil} from "../../lib/utils";
import {useRequestJson} from "../../lib/client";
import Container from "../../components/container";
import Loader from "../../components/loader";
import {toast} from "react-toastify";

function CodeHandler(): JSX.Element {
    const router = useRouter()
    const { setSession } = useContext(SessionContext);
    const requestJson = useRequestJson()

    useEffect(() => {

        // Check if we have code, if so, request token from server
        const params = new URL(window.location.href).searchParams

        // check if previous page is stored, otherwise redirect to home
        let storedUrl = StorageUtil.load("previous_page", "/")
        StorageUtil.remove("previous_page")

        if (params.has("code") && params.has("state")) {
            // Send code and state to backend
            requestJson('POST', Const.CAM_URL + '/oauth2/discord/code', {
                code: params.get("code"),
                state: params.get("state")
            }).then(data => {
                // set session
                const session = data as Session
                setSession(session)

                toast("Logged in successfully")
                router.push(storedUrl)
            }).catch(err => {
                console.error(err)

                toast.error("Something went wrong, please try again")
                router.push(storedUrl)
            })
        } else {
            let storedUrl = StorageUtil.load("previous_page", "/")
            StorageUtil.remove("previous_page")

            // redirect and show error toast
            toast.error("Something went wrong, please try again")
            router.push(storedUrl)
        }
    }, [])

    return <Loader/>
}

const DiscordCallback: NextPage = () => {

    return <Container>
        <CodeHandler/>
    </Container>
}

export default DiscordCallback
