import React, {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import SessionContext from "../../lib/context";
import {loadFromLocalStorage, removeFromLocalStorage} from "../../lib/utils";
import Loader from "../../components/loader";
import {toast} from "react-toastify";
import {useRequestDiscordCode} from "../../lib/service";

export default function DiscordCallbackPage() {
    const router = useRouter()
    const { setSession } = useContext(SessionContext);
    const requestCode = useRequestDiscordCode()

    useEffect(() => {
        // Check if we have code, if so, request token from server
        const params = new URL(window.location.href).searchParams

        // check if previous page is stored, otherwise redirect to home
        let storedUrl = loadFromLocalStorage("previous_page", "/")
        removeFromLocalStorage("previous_page")

        if (params.has("code") && params.has("state")) {
            // Send code and state to backend
            requestCode(params.get("code")!, params.get("state")!).then(session => {
                setSession(session)

                toast("Logged in successfully")
                router.push(storedUrl)
            }).catch(err => {
                console.error(err)

                toast.error("Something went wrong, please try again")
                router.push(storedUrl)
            })
        } else {
            let storedUrl = loadFromLocalStorage("previous_page", "/")
            removeFromLocalStorage("previous_page")

            // redirect and show error toast
            toast.error("Something went wrong, please try again")
            router.push(storedUrl)
        }
    }, [router, requestCode, setSession])

    return <Loader/>
}
