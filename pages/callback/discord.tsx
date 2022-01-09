import type { NextPage } from 'next'
import React, {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import Session from "../../lib/object/session";
import User from "../../lib/object/user";
import SessionContext from "../../lib/context";
import {Const} from "../../lib/utils";
import {Client} from "../../lib/client";

function CodeHandler(): JSX.Element {
    const router = useRouter()
    const { session, setSession } = useContext(SessionContext);

    useEffect(() => {

        /* Check if we have code, if so, request token from server */

        const params = new URL(window.location.href).searchParams

        if (params.has("code") && params.has("state")) {
            // Send code and state to backend
            Client.requestJson(Const.CAM_URL + '/oauth2/discord/code', 'POST', {
                code: params.get("code"),
                state: params.get("state")
            }).then(data => {
                console.log(data) //TODO: Remove logging

                // set session
                const session = data as Session
                console.log(session) //TODO: Remove logging
                setSession(session)

                router.push('/') //TODO: Redirect to previous page
            })
            setSession(new Session(null, null, new User('', 'UsErNaMe', "1234")))
            router.push('/')
        } else {
            // redirect to error page
            router.push("/400")
        }
    }, []);

    return <p className='text-discal-light-grey pt-10 text-center'>
        Redirecting...
    </p>
}

const DiscordCallback: NextPage = () => {

    return <CodeHandler/>
}

export default DiscordCallback
