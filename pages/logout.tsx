import {useRouter} from "next/router";
import React, {useContext, useEffect} from "react";
import {useRequestEmpty} from "../lib/client";
import {Const} from "../lib/utils";
import Loader from "../components/loader";
import {NextPage} from "next";
import Container from "../components/container";
import SessionContext from "../lib/context";
import Session from "../lib/object/session";
import {toast} from "react-toastify";

function RedirectHandler(): JSX.Element {
    const router = useRouter()
    const {setSession} = useContext(SessionContext);
    const requestEmpty = useRequestEmpty()
    const notify = () => toast("Logged out successfully", {
        position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
    });

    useEffect(() => {
        // clear session
        requestEmpty('GET', Const.CAM_URL + '/oauth2/discord/logout').finally(() => {
            setSession(new Session())

            //TODO: Learn how to make this not disappear on navigation
            notify()

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
