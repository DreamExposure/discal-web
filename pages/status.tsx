import React, {useEffect, useState} from "react";
import {NextPage} from "next";
import {Const} from "../lib/utils";
import {useRequestJson}  from "../lib/client";
import Container from "../components/container";
import Loader from "../components/loader";
import {toast} from "react-toastify";
import type {NetworkStatus} from "../lib/types";
import Custom500 from "./500";

function Handler(): JSX.Element {
    const requestJson = useRequestJson()

    const [data, setData] = useState<NetworkStatus>()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        // get link and push the client to it
        requestJson('GET', Const.API_URL + '/v3/status').then(data => {
            setData(data)
        }).catch(error => {
            console.error("Status get error", error)
            toast.error("Failed to get status")
        }).finally(() => {
            // Always set loading state here rather than in the above handlers just for sanity
            setLoading(false)
        })
    }, []);

    if (isLoading) return <Loader/>
    if (!data) return <Custom500/>

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
