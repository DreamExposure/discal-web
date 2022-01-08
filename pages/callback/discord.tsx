import type { NextPage } from 'next'
import React, {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import Session from "../../lib/object/session";
import User from "../../lib/object/user";
import SessionContext from "../../lib/context";


function CodeHandler(): JSX.Element {
    const router = useRouter()
    const { session, setSession } = useContext(SessionContext);

    useEffect(() => {

        /* Check if we have code, if so, request token from server */

        const params = new URL(window.location.href).searchParams

        if (params.has("code") && params.has("state")) {
            //TODO: Remove this log once we confirm the docker deploy changes worked
            console.log("Cam URL:" + process.env.NEXT_PUBLIC_CAM_URL)
            // Send code and state to backend
            /*Client.requestJson(process.env.NEXT_PUBLIC_CAM_URL + '/oauth2/discord/code', 'POST', {

            }).then(data => {
                //TODO: Save token and user data to context/state and redirect

                setSession(new Session(null, new User('', 'UsErNaMe', "1234")))

                console.log(data)
                router.push('/')
            })*/
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
