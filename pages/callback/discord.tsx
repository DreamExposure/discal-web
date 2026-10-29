import React, {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import SessionContext from "../../lib/context";
import {loadFromLocalStorage, removeFromLocalStorage} from "../../lib/utils";
import Loader from "../../components/loader";
import {toast} from "react-toastify";
import {useRequestDiscordCode} from "../../lib/service";
import Head from "next/head";

export default function DiscordCallbackPage() {
    const router = useRouter()
    const { setSession } = useContext(SessionContext);
    const requestCode = useRequestDiscordCode()

    const fetchDiscordCode = async (code: string, state: string) => {
        let response = await requestCode(code, state)

        if (response.success) {
            setSession(response.data)

            toast("Logged in successfully")
        } else {
            console.error(response.error)
            toast.error("Something went wrong, please try again")
        }

        let storedUrl = loadFromLocalStorage("previous_page", "/")
        removeFromLocalStorage("previous_page")
        await router.push(storedUrl)
    }

    useEffect(() => {
        // Check if we have code, if so, request token from server
        const params = new URL(window.location.href).searchParams
        const code = params.get("code")
        const state = params.get("state")

        if (code && state) {
            fetchDiscordCode(code, state)
        }
    }, [])

    return <>
        <Head>
            <title>Discord Login - DisCal Bot</title>
        </Head>
        <Loader/>
    </>
}
