import React, {JSX, useEffect, useState} from "react";
import Loader from "../components/loader";
import {toast} from "react-toastify";
import type { NetworkStatus} from "../lib/types";
import Custom500 from "./500";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons"
import {useRequestStatus} from "../lib/service";
import Container from "../components/container";
import Head from "next/head";
import {ServerStackIcon, LockClosedIcon} from "@heroicons/react/24/solid";

export default function StatusPage() {
    const requestStatus = useRequestStatus();

    const [data, setData] = useState<NetworkStatus>()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        // get link and push the client to it
        requestStatus().then(data => {
            setData(data)
        }).catch(error => {
            console.error("Status get error", error)
            toast.error("Failed to get status")
        }).finally(() => {
            // Always set loading state here rather than in the above handlers just for sanity
            setLoading(false)
        })
    }, [requestStatus]);

    if (isLoading) return <Loader/>
    if (!data) return <Custom500/>

    return <>
        <Head>
            <title>Status - DisCal Bot</title>
        </Head>
        <Container>
            <GeneralStats data={data}/>
            <ServiceStats data={data}/>
            <ShardStats data={data}/>
        </Container>
    </>
}

function GeneralStats(props: {data: NetworkStatus}): JSX.Element {
    const stats = [
        {name: 'Guilds', stat: props.data.total_guilds},
        {name: 'Calendars', stat: props.data.total_calendars},
        {name: 'Announcements', stat: props.data.total_announcements},
        {name: 'Connected Shards', stat: `${props.data.bot_status.length}/${props.data.expected_shard_count}`},
        {name: 'Memory Usage', stat: `${totalMemUsageInGb(props.data)}GB`},
    ]

    function totalMemUsageInGb(data: NetworkStatus) {
        let totalMem = 0.0

        totalMem += data.api_status.memory

        data.cam_status.forEach(value => totalMem += value.memory)
        data.bot_status.forEach(value => totalMem += value.instance.memory)

        return mbToGb(totalMem)
    }

    return <div>
        <h3 className="text-2xl leading-6 font-medium text-discord-blurple">Network Statistics</h3>
        <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y
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

function ServiceStats(props: {data: NetworkStatus}): JSX.Element {
    const services = [
        // Since there's only 1 API server, we can just statically add it to this list
        {
            name: 'API',
            icon: ServerStackIcon,
            version: props.data.api_status.version,
            d4jVersion: props.data.api_status.d4j_version,
            memory: `${mbToGb(props.data.api_status.memory)}GB`,
            uptime: props.data.api_status.human_uptime,
            lastHeartbeat: minutesAgo(new Date(props.data.api_status.last_heartbeat))
        },
    ]

    // Iterate CAM clients and add to service list
    props.data.cam_status.forEach(cam => {
        services.push({
            name: `Authentication ${cam.instance_id.substring(0, 8)}`,
            icon: LockClosedIcon,
            version: cam.version,
            d4jVersion: cam.d4j_version,
            memory: `${mbToGb(cam.memory)}GB`,
            uptime: cam.human_uptime,
            lastHeartbeat: minutesAgo(new Date(cam.last_heartbeat))
        })
    })


    function ServiceList(): JSX.Element {
        return <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((srv) => (
                <li key={srv.name} className="col-span-1 bg-white rounded-lg shadow divide-y">
                    <div className="w-full flex items-center justify-between p-6 space-x-6">
                        <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                                <h3 className="text-discal-not-black text-sm font-semibold truncate">{srv.name}</h3>
                                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs
                                font-medium bg-green-100 rounded-full" aria-label='version'>
                                    {srv.version}
                                </span>
                            </div>
                            <p className="mt-1 text-discal-not-black text-sm truncate">
                                Discord4J Version: {srv.d4jVersion}
                            </p>
                            <p className="mt-1 text-discal-not-black text-sm truncate">
                                RAM Usage: {srv.memory}
                            </p>
                            <p className="mt-1 text-discal-not-black text-sm truncate">
                                Uptime: {srv.uptime}
                            </p>
                            <p className="mt-1 text-discal-not-black text-sm truncate">
                                Last Heartbeat: {srv.lastHeartbeat}
                            </p>
                        </div>
                        <srv.icon className="w-10 h-10 rounded-full flex-shrink-0 text-discal-dark-blue"/>
                    </div>
                </li>
            ))}
        </ul>
    }

    return <div className='mt-10'>
        <h3 className="text-2xl leading-6 font-medium text-discord-blurple mb-5">Service Status</h3>
        <ServiceList/>
    </div>
}

function ShardStats(props: {data: NetworkStatus}): JSX.Element {
    function listAll(): any[] {
        let array: any[] = [];

        props.data.bot_status.forEach(bot => {
            array.push({
                name: `Shard ${bot.shard_index}`,
                version: bot.instance.version,
                d4jVersion: bot.instance.d4j_version,
                guilds: bot.guilds,
                memory: `${mbToGb(bot.instance.memory)}GB`,
                uptime: bot.instance.human_uptime,
                lastHeartbeat: minutesAgo(new Date(bot.instance.last_heartbeat))
            })
        })

        return array
    }

    function ShardList(): JSX.Element {
        return <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {listAll().map((srv) => (
                <li key={srv.name} className="col-span-1 bg-white rounded-lg shadow divide-y">
                    <div className="w-full flex items-center justify-between p-6 space-x-6">
                        <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                                <h3 className="text-discal-not-black text-sm font-semibold truncate">{srv.name}</h3>
                                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs
                                font-medium bg-green-100 rounded-full" aria-label='version'>
                                    {srv.version}
                                </span>
                            </div>
                            <p className="mt-1 text-discal-not-black text-sm truncate">
                                Guilds: {srv.guilds}
                            </p>
                            <p className="mt-1 text-discal-not-black text-sm truncate">
                                Discord4J Version: {srv.d4jVersion}
                            </p>
                            <p className="mt-1 text-discal-not-black text-sm truncate">
                                RAM Usage: {srv.memory}
                            </p>
                            <p className="mt-1 text-discal-not-black text-sm truncate">
                                Uptime: {srv.uptime}
                            </p>
                            <p className="mt-1 text-discal-not-black text-sm truncate">
                                Last Heartbeat: {srv.lastHeartbeat}
                            </p>
                        </div>
                        <FontAwesomeIcon icon={faRobot}
                                         className="w-10 h-10 rounded-full flex-shrink-0 text-discal-dark-blue"/>
                    </div>
                </li>
            ))}
        </ul>
    }

    return <div className='mt-10'>
        <h3 className="text-2xl leading-6 font-medium text-discord-blurple mb-5">Bot Client Status</h3>
        <ShardList/>
    </div>
}

function mbToGb(value: number): string {
    return (((value / 1024) * 100) / 100).toFixed(2)
}

function minutesAgo(past: Date): string {
    let seconds = ((new Date().getTime() - past.getTime()) / 1000)

    return seconds > 60 ? `${(seconds / 60).toFixed(1)}m ago` : `${seconds.toFixed(0)}s ago`
}
