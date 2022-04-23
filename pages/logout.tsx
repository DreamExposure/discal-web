import {useRouter} from "next/router";
import React, {useContext, useEffect} from "react";
import Loader from "../components/loader";
import SessionContext from "../lib/context";
import {toast} from "react-toastify";
import {useRequestLogout} from "../lib/service";
import {Session} from "../lib/types";

export default function LogoutPage() {
    const router = useRouter()
    const {setSession} = useContext(SessionContext);
    const requestLogout = useRequestLogout()

    useEffect(() => {
        // clear session
        requestLogout().finally(() => {
            setSession({} as Session)

            toast("Logged out successfully")
            router.back()
        })
    }, [router, requestLogout, setSession])

    return <Loader/>
}
