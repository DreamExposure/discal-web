import {useRouter} from "next/router";
import React, {useContext, useEffect} from "react";
import Loader from "../components/loader";
import SessionContext from "../lib/context";
import {toast} from "react-toastify";
import {useRequestLogout} from "../lib/service";
import {Session, SessionContextData} from "../lib/types";
import Head from "next/head";

export default function LogoutPage() {
    const router = useRouter()
    const {setSession} = useContext(SessionContext);
    const requestLogout = useRequestLogout()

    useEffect(() => {
        // clear entire session - including temp token
        requestLogout().finally(() => {
            setSession({} as SessionContextData)

            toast("Logged out successfully")
            router.back()
        })
    }, [router, requestLogout, setSession])

    return <>
        <Head>
            <title>Logout - DisCal Bot</title>
        </Head>
        <Loader/>
    </>
}
