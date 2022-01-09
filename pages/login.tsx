import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {NextPage} from "next";
import {Const} from "../lib/utils";

function RedirectHandler(): JSX.Element {
    const router = useRouter()

    useEffect(() => {
        // redirect to login url
        router.push(Const.CAM_URL + "/oauth2/discord/login", '/oauth2/discord/login')
    }, []);

    return <p className='text-discal-light-grey pt-10 text-center'>
        Redirecting...
    </p>
}

const Login: NextPage = () => {

    return <RedirectHandler/>
}

export default Login
