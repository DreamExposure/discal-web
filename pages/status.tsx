import React, {useEffect, useState} from "react";
import {NextPage} from "next";
import {Const} from "../lib/utils";
import {useRequestJson} from "../lib/client";
import Container from "../components/container";
import Loader from "../components/loader";
import {toast} from "react-toastify";
import type {NetworkProps, NetworkStatus} from "../lib/types";
import Custom500 from "./500";

function Handler(): JSX.Element {
    const requestJson = useRequestJson()

    const [data, setData] = useState<NetworkStatus>()
    const [isLoading, setLoading] = useState(true)

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
        <GeneralStats data={data}/>
    </div>
}

function GeneralStats(props: NetworkProps): JSX.Element {
    const stats = [
        {name: 'Total Guilds', stat: props.data.total_guilds},
        {name: 'Total Calendars', stat: props.data.total_calendars},
        {name: 'Total Announcements', stat: props.data.total_announcements},
        {name: 'Connected Shards', stat: props.data.bot_status.length + '/' + props.data.expected_shard_count},
        {name: 'Memory Usage', stat: '24.57%'},
    ]


    return <div>
        <h3 className="text-xl leading-6 font-medium text-discal-blue">Network Statistics</h3>
        <dl className="mt-5 grid grid-cols-1 rounded-lg bg-discal-light-grey overflow-hidden shadow divide-y
        divide-discal-dark-grey md:grid-cols-5 md:divide-y-0 md:divide-x">
            {stats.map((item) => (
                <div key={item.name} className="px-4 py-5 sm:p-6">
                    <dt className="text-base font-normal text-discal-not-black">{item.name}</dt>
                    <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                        <div className="flex items-baseline text-2xl font-semibold text-discal-blue">
                            {item.stat}
                        </div>
                    </dd>
                </div>
            ))}
        </dl>
    </div>
}

const Invite: NextPage = () => {

    return <Container>
        <Handler/>
    </Container>
}

export default Invite
