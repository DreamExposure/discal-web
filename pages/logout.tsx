import {useRouter} from "next/router";
import React, {useContext, useEffect} from "react";
import {useRequestJson} from "../lib/client";
import {Const} from "../lib/utils";
import Loader from "../components/loader";
import {NextPage} from "next";
import Container from "../components/container";
import SessionContext from "../lib/context";
import Session from "../lib/object/session";

function RedirectHandler(): JSX.Element {
    const router = useRouter()
    const {setSession} = useContext(SessionContext);
    const requestJson = useRequestJson()

    useEffect(() => {
        // clear session
        requestJson('GET', Const.CAM_URL + '/oauth2/discord/logout').finally(() => {
            setSession(new Session())
            router.back()
        })
    }, [])

    return <Loader/>
}

const Logout: NextPage = () => {

    return <Container>
        <RedirectHandler/>
    </Container>
}

export default Logout
