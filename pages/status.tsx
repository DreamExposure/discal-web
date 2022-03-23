import React, {useEffect, useState} from "react";
import {NextPage} from "next";
import {Const} from "../lib/utils";
import {useRequestJson}  from "../lib/client";
import Container from "../components/container";
import Loader from "../components/loader";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import type {NetworkStatus} from "../lib/types";

function Handler(): JSX.Element {
    const router = useRouter()
    const requestJson = useRequestJson()

    const [data, setData] = useState<NetworkStatus>()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        // get link and push the client to it
        requestJson('GET', Const.API_URL + '/v3/status').then(data => {
            setData(JSON.parse(data))
        }).catch(error => {
            console.error("Status get error", error)
            toast.error("Failed to get status")
            router.push('/500')
        }).finally(() => {
            // Always set loading state here rather than in the above handlers just for sanity
            setLoading(false)
        })
    }, []);

    if (isLoading) return <Loader/>
    if (!data) return <p>Oh shit! something went wrong!</p> /* TODO: Actually return something better */

    return <div>
        {/* TODO: Actually display data here */}
    </div>
}

const Invite: NextPage = () => {

    return <Container>
        <Handler/>
    </Container>
}

export default Invite
