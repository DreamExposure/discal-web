import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {NextPage} from "next";
import {Const} from "../lib/utils";
import {Client} from "../lib/client";
import LoginResponse from "../lib/json/login-response";

function RedirectHandler(): JSX.Element {
    const router = useRouter()

    useEffect(() => {
        // Send code and state to backend
        Client.requestJson(Const.CAM_URL + '/oauth2/discord/login', 'GET', {}).then(data => {
            console.log(data) //TODO: Remove logging

            // get link and push the client to it
            const response = data as LoginResponse

            router.push(response.link)
        })
    }, []);

    return <p className='text-discal-light-grey pt-10 text-center'>
        Redirecting...
    </p>
}

const Login: NextPage = () => {

    return <RedirectHandler/>
}

export default Login
