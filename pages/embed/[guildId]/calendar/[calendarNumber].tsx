import {useRouter} from 'next/router'
import Calendar from "../../../../components/calendar";
import Container from "../../../../components/container";
import {useContext, useEffect, useState} from "react";
import {CalendarV3Model, SessionContextData} from "../../../../lib/types";
import Loader from "../../../../components/loader";
import Custom500 from "../../../500";
import {useRequestCalendar, useRequestTemporaryEmbedToken} from "../../../../lib/service";
import {toast} from "react-toastify";
import Head from "next/head";
import SessionContext from "../../../../lib/context";
import Link from "next/link";
import {saveToLocalStorage} from "../../../../lib/utils";


function PrivateCalendar() {
    const router = useRouter()

    return <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <h1 className="text-3xl font-semibold text-discal-blue uppercase tracking-wide">
            403 error
        </h1>
        <h1 className="mt-3 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Looks like this calendar is private.
        </h1>
        <p className="mt-4 text-lg font-medium text-discord-greyple">
            Only members of the guild may view this calendar. The account you are logged in with is not a member of the guild.
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

function LoginRequired() {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <h1 className="text-3xl font-semibold text-discal-blue uppercase tracking-wide">
            403 error
        </h1>
        <h1 className="mt-3 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Looks like this calendar is private.
        </h1>
        <p className="mt-4 text-lg font-medium text-discord-greyple">
            Only members of the guild may view this calendar. Try logging in if you are a member of the guild.
        </p>
        <div className="mt-6">
            <Link onClick={() => saveToLocalStorage("previous_page", window.location.href)}
                  href='/login'
                    className='bg-discal-light-grey text-sm font-medium rounded-md px-4 py-2 text-black
                    hover:bg-discal-blue hover:text-white'>
                Login with Discord
            </Link>
        </div>
    </div>
}

export default function CalendarEmbedPage() {
    const router = useRouter()
    const requestCalendar = useRequestCalendar()
    const requestTempToken = useRequestTemporaryEmbedToken()
    const {session, setSession} = useContext(SessionContext)

    const [data, setData] = useState<CalendarV3Model>()
    const [timezones, setTimezones] = useState<string[]>([])
    const [loginRequired, setLoginRequired] = useState(false)
    const [isLoading, setLoading] = useState(true)

    // FIXME: This is gonna need some logic to handle malformed URLs
    const guildId = router.query.guildId?.toString()
    const calendarNumber = parseInt(router.query.calendarNumber?.toString() ?? "1")

    const fetchTemporaryToken = async () => {
        // Reset state
        setLoading(true)

        // Do not fetch if logged in
        if (session.session) return

        // Do not fetch if existing temp token still valid + for this guild
        if (session.tempToken && session.tempToken.guildId == guildId && (new Date(session.tempToken.expiresAt).valueOf() - new Date().valueOf() > 0)) return

        // response logic
        const response = await requestTempToken(guildId!)

        if (response.success) {
            setSession({ tempToken: response.data } as SessionContextData)
        } else {
            // Other error state
            setLoading(false)
            toast.error(`Error requesting API Token - ${response.error?.error}`)
        }
    }

    const fetchCalendarData = async () => {
        // Reset state
        setLoading(true)
        setLoginRequired(false)
        setData(undefined)

        if (!session.session && !session.tempToken) return


        const response = await requestCalendar(guildId!, calendarNumber)

        if (response.success) {
            setData(response.data)
            setLoading(false)
        } else if (response.code == 403) {
            // Calendar is private, user must log in and be a member of the guild
            setLoginRequired(true)
            setLoading(false)
        } else {
            // Other error state
            setLoading(false)
            toast.error(`Error requesting calendar data - ${response.error?.error}`)
        }

        setData(response.data)
    }

    const fetchValidTimezones = async ()=> {
        // Sanity check to not fetch again if they're already populated
        if (timezones.length > 0) return

        const response = await fetch('https://fullcalendar.io/demo-timezones.json', {method: 'GET'})
        if (response.ok) setTimezones(await response.json())
    }

    const renderCorrectView = () => {
        if (isLoading) return <Loader/>

        if (!data && loginRequired) {
            if (session.session) return <PrivateCalendar/>
            else return <LoginRequired/>
        }

        if (!data) return <Custom500/>

        return <Calendar calendar={data} timezones={timezones}/>
    }

    // Fire once on page load
    useEffect(() => {
        fetchValidTimezones()
    }, [])

    useEffect(() => {
        // Need guildId, wait for next render
        if (guildId === undefined) return

        // Get temp token
        fetchTemporaryToken()

        // Get calendar
        fetchCalendarData()
    }, [guildId, session])


    return <>
        <Head>
            <title>Guild Calendar - DisCal Bot</title>
        </Head>

        <Container>
            {renderCorrectView()}
        </Container>
    </>

}