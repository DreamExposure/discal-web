
import {useContext, useEffect, useState} from "react";
import SessionContext from "../../../lib/context";
import Loader from "../../../components/loader";
import Custom400 from "../../../components/400";
import Head from "next/head";
import Container from "../../../components/container";
import LoginRequired from "../../../components/login-required";
import {useRouter} from "next/router";
import WorkInProgress from "../../../components/work-in-progress";
import {useRequestWebGuild} from "../../../lib/service";
import {WebGuildV3Model} from "../../../lib/types";
import {toast} from "react-toastify"
import Link from "next/link";
import {saveToLocalStorage} from "../../../lib/utils";

function Unauthorized() {
    const router = useRouter()

    return <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <h1 className="text-3xl font-semibold text-discal-blue uppercase tracking-wide">
            403 error
        </h1>
        <h1 className="mt-3 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Looks like you don't have permission to view that
        </h1>
        <p className="mt-4 text-lg font-medium text-discord-greyple">
            Only members of the guild may view this. The account you are logged in with is not a member of the guild.
        </p>
        <div className="mt-6">
            <button onClick={() => router.back()}
                    className='bg-discal-light-grey text-sm font-medium rounded-md px-4 py-2 text-black
                    hover:bg-discal-blue hover:text-white'>
                Go back
            </button>
        </div>
    </div>
}

function BotNotInGuild(props: {guildId: string}) {
    // TODO: Add GO BACK button

    return <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <h1 className="text-3xl font-semibold text-discal-blue uppercase tracking-wide">
            404 error
        </h1>
        <h1 className="mt-3 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Looks like DisCal isn't in this guild.
        </h1>
        <p className="mt-4 text-lg font-medium text-discord-greyple">
            Due to the laws of physics, DisCal needs to be invited to the guild before this dashboard can be used
        </p>
        <div className="mt-6">
            <Link onClick={() => saveToLocalStorage("previous_page", window.location.href)}
                  href={`/invite?guildId=${props.guildId}`}
                  className='bg-discal-light-grey text-sm font-medium rounded-md px-4 py-2 text-black
                    hover:bg-discal-blue hover:text-white'>
                Invite to Guild
            </Link>
        </div>
    </div>
}

export default function DashboardIndex() {
    const router = useRouter()
    const requestWebGuild = useRequestWebGuild()
    const {session} = useContext(SessionContext)

    const [loggedIn, setLoggedIn] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [botNotInGuild, setBotNotInGuild] = useState(false)
    const [unauthorized, setUnauthorized] = useState(false)
    const [guild, setGuild] = useState<WebGuildV3Model>()

    const guildId = router.query.guildId?.toString()

    const fetchWebGuild = async () => {
        // Reset state
        setLoading(true)
        setGuild(undefined)
        setIsError(false)

        // Sanity check
        if (!session.session || !loggedIn || !guildId) return

        const response = await requestWebGuild(guildId, session.session.user.id)

        if (response.success) {
            setGuild(response.data)
            setIsError(false)
            setLoading(false)
        } else if (response.code == 403) {
            // User is not authorized to view this guild's dashboard
            setUnauthorized(true)
            setLoading(false)

        } else if (response.code === 404) {
            // Bot is not in guild or guild does not exist
            setBotNotInGuild(true)
            setLoading(false)
        } else {
            // Other error state
            setIsError(true)
            setLoading(false)

            toast.error(`Error requesting guild data - ${response.error?.error}`)
        }
    }

    const renderCorrectView = () => {
        if (!guildId) return <></>

        if (!loggedIn) return <LoginRequired/>
        if (isLoading) return <Loader/>

        if (unauthorized) return <Unauthorized/>
        if (botNotInGuild) return <BotNotInGuild guildId={guildId!}/>
        if (isError) return <Custom400/>

        // TODO: Render actual view instead of WIP
        return <WorkInProgress/>
    }

    useEffect(() => {
        setLoggedIn(session.session !== undefined && session.session !== null)

        fetchWebGuild()
    }, [guildId, session, loggedIn])

    return <>
        <Head>
            <title>Dashboard - DisCal Bot</title>
        </Head>

        <Container>
            {renderCorrectView()}
        </Container>
    </>
}