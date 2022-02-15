import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {NextPage} from "next";
import {Const} from "../lib/utils";
import {useRequestJson, useRequestText} from "../lib/client";
import Container from "../components/container";
import Loader from "../components/loader";

function RedirectHandler(): JSX.Element {
    const router = useRouter()
    const requestText = useRequestText()

    useEffect(() => {
        // get link and push the client to it
        requestText('GET', Const.API_URL + '/v3/invite').then(data => {
            router.push(data)
        })
    }, []);

    return <Loader/>
}

const Invite: NextPage = () => {

    return <Container>
        <RedirectHandler/>
    </Container>
}

export default Invite
