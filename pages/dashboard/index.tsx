import Link from "next/link";
import {JSX, useContext, useEffect, useState} from "react";
import SessionContext from "../../lib/context";
import Loader from "../../components/loader";
import Head from "next/head";
import Container from "../../components/container";
import {PartialGuild} from "../../lib/types";
import {useRequestUserGuilds} from "../../lib/service";
import {toast} from "react-toastify"
import Custom400 from "../../components/400";
import Image from "next/image";
import {QuestionMarkCircleIcon} from "@heroicons/react/24/outline";
import {Button} from "@headlessui/react";
import LoginRequired from "../../components/login-required";

function GuildsList(props: {guilds: PartialGuild[], refreshHook: (skipCache: boolean) => void}) {
    const [searchFilter, setSearchFilter] = useState<string>("")

    function GuildBlocks(): JSX.Element {
        let filteredGuilds = props.guilds

        if (searchFilter?.trim().length > 0) {
            filteredGuilds = props.guilds.filter((guild) => {
                return guild.name.toLowerCase().includes(searchFilter.toLowerCase())
            })
        }

        return <>
            {filteredGuilds.map((guild) => (
                <Link href={`dashboard/${guild.id}`} key={guild.id} className="rounded-lg bg-discal-light-grey text-discal-dark-blue hover:bg-discal-blue hover:text-white focus:outline-discal-blue">
                    <div className="flex items-center">
                        <div>
                            <span className="inline-flex items-center justify-center m-2">
                                {guild.iconUrl ?
                                    <Image className='h-12 w-12 rounded-lg' width='512' height='512' aria-hidden='true' src={guild.iconUrl} alt="Guild icon"/>
                                    :
                                    <QuestionMarkCircleIcon className='h-12 w-12 rounded-lg bg-discal-blue text-white' aria-hidden='true'/>
                                }
                            </span>
                        </div>

                        <p className="text-lg font-medium tracking-tight pr-4">
                            {guild.name}
                        </p>
                    </div>
                </Link>
            ))}
        </>
    }

    return <div className="max-w-7xl mx-auto text-center">
        <h1 className="mt-3 text-4xl font-extrabold text-white tracking-tight">
            Guilds
        </h1>

        <p className="mt-4 text-lg font-medium text-discord-greyple">
            Select a guild below to continue
        </p>

        <div className='flex flex-col'>
            <input
                onChange={(event) => {setSearchFilter(event.target.value)}}
                value={searchFilter}
                name="Guild search"
                type="text"
                placeholder="Search guilds"
                aria-label="Guild Search"
                className="w-full sm:w-1/2 lg:w-1/3 rounded-md mt-2 px-3 py-1.5 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 bg-white/5 text-white outline-white/10 placeholder:text-discal-light-grey focus:outline-discal-blue"
            />
        </div>

        <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <GuildBlocks/>
            </div>
        </div>


        <hr className='text-discal-light-grey max-w-xl mx-auto mt-10'/>
        <div className='mx-w-5xl mx-auto text-center mt-6'>
            <p className='text-discal-light-grey'>Don't see a guild?</p>
            <Button
                onClick={() => props.refreshHook(true)}
                className='rounded-md mt-4 px-3 py-2 text-sm font-semibold
                text-white focus-visible:outline-2 focus-visible:outline-offset-2 bg-discal-blue shadow-none
                 hover:bg-discal-light-grey hover:text-discal-dark-grey focus-visible:outline-discal-blue'
            >
                Refresh
            </Button>
        </div>
    </div>
}

export default function DashboardIndex() {
    const requestGuilds = useRequestUserGuilds()
    const {session} = useContext(SessionContext)

    const [loggedIn, setLoggedIn] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [guilds, setGuilds] = useState<PartialGuild[]>([])

    const fetchGuilds = async (skipCache: boolean) => {
        // Reset state
        setLoading(true)
        setGuilds([])

        // Sanity check
        if (!session.session || !loggedIn) {
            setLoading(false)
            return
        }

        const response = await requestGuilds(session.session.user.id, skipCache)

        if (response.success) {
            setGuilds(response.data)
            setLoading(false)
            setIsError(false)
        } else {
            // Error state
            setIsError(true)
            setLoading(false)

            toast.error(`Error requesting guilds - ${response.error?.error}`)
        }
    }

    const renderCorrectView = () => {
        if (isLoading) return <Loader/>
        if (!loggedIn) return <LoginRequired/>
        if (isError) return <Custom400/>

        return <GuildsList guilds={guilds} refreshHook={fetchGuilds}/>
    }

    useEffect(() => {
        setLoggedIn(session.session !== undefined && session.session !== null)

        fetchGuilds(false)
    }, [session, loggedIn])

    return <>
        <Head>
            <title>Dashboard - DisCal Bot</title>
        </Head>

        <Container>
            {renderCorrectView()}
        </Container>
    </>
}