import React, {useEffect, useState} from "react";
import {NextPage} from "next";
import {Const} from "../lib/utils";
import {useRequestJson} from "../lib/client";
import Container from "../components/container";
import Loader from "../components/loader";
import {toast} from "react-toastify";
import type {NetworkProps, NetworkStatus} from "../lib/types";
import Custom500 from "./500";
import {ServerIcon} from "@heroicons/react/solid";

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
        <ServiceStats data={data}/>
    </div>
}
function GeneralStats(props: NetworkProps): JSX.Element {
    const stats = [
        {name: 'Guilds', stat: props.data.total_guilds},
        {name: 'Calendars', stat: props.data.total_calendars},
        {name: 'Announcements', stat: props.data.total_announcements},
        {name: 'Connected Shards', stat: props.data.bot_status.length + '/' + props.data.expected_shard_count},
        {name: 'Memory Usage', stat: totalMemUsageInGb(props.data) + "GB"},
    ]

    function totalMemUsageInGb(data: NetworkStatus) {
        let totalMem = 0.0

        totalMem += data.api_status.memory
        totalMem += data.cam_status?.memory ?? 0.0

        data.bot_status.forEach(value => totalMem += value.instance.memory)

        return mbToGb(totalMem)
    }

    return <div>
        <h3 className="text-2xl leading-6 font-medium text-discal-blue">Network Statistics</h3>
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

function ServiceStats(props: NetworkProps): JSX.Element {
    const services = [
        {
            name: 'API',
            version: props.data.api_status.version,
            d4jVersion: props.data.api_status.d4j_version,
            memory: mbToGb(props.data.api_status.memory) + 'GB',
            uptime: props.data.api_status.human_uptime,
            lastHeartbeat: minutesAgo(new Date(props.data.api_status.last_heartbeat))
        },
        {
            name: 'Authentication',
            version: props.data.cam_status.version,
            d4jVersion: props.data.cam_status.d4j_version,
            memory: mbToGb(props.data.cam_status.memory) + 'GB',
            uptime: props.data.cam_status.human_uptime,
            lastHeartbeat: minutesAgo(new Date(props.data.cam_status.last_heartbeat))
        }
        // More services one day, hopefully...
    ]

    function minutesAgo(past: Date): string {
        let seconds = ((new Date().getTime() - past.getTime()) / 1000)

        return seconds > 60 ? (seconds / 60).toFixed(1) + 'm ago' : seconds.toFixed(0) + 's ago';
    }

    function ServiceList(): JSX.Element {
        return <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((srv) => (
                <li key={srv.name} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                    <div className="w-full flex items-center justify-between p-6 space-x-6">
                        <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                                <h3 className="text-gray-900 text-sm font-medium truncate">{srv.name}</h3>
                                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs
                                font-medium bg-green-100 rounded-full">
                                    {srv.version}
                                </span>
                            </div>
                            <p className="mt-1 text-gray-500 text-sm truncate">Discord4J Version: {srv.d4jVersion}</p>
                            <p className="mt-1 text-gray-500 text-sm truncate">RAM Usage: {srv.memory}</p>
                            <p className="mt-1 text-gray-500 text-sm truncate">Uptime: {srv.uptime}</p>
                            <p className="mt-1 text-gray-500 text-sm truncate">Last Heartbeat: {srv.lastHeartbeat}</p>
                        </div>
                        <ServerIcon className="w-10 h-10 rounded-full flex-shrink-0"/>
                    </div>
                </li>
            ))}
        </ul>
    }

    return <div className='mt-10'>
        <h3 className="text-2xl leading-6 font-medium text-discal-blue mb-5">Service Statistics</h3>
        <ServiceList/>
    </div>
}

function mbToGb(value: number) {
    return (((value / 1024) * 100) / 100).toFixed(2)
}

const Invite: NextPage = () => {

    return <Container>
        <Handler/>
    </Container>
}

export default Invite
