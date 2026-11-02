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
        if (session.tempToken && session.tempToken.guildId == guildId) return

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



    if (isLoading) return <Loader/>
    // TODO: Show something for login being required and/or not being a member of the guild
    if (!data && loginRequired) return <>
        <p>Oopsie Woopsie you need to loggie insie</p>
    </>
    if (!data) return <Custom500/>

    return <>
        <Head>
            <title>Guild Calendar - DisCal Bot</title>
        </Head>

        <Container>
            <h1 className='text-xl text-discal-red'>Guild ID: {guildId} | Calendar Number: {calendarNumber}</h1>
            <Calendar calendar={data} timezones={timezones}/>
        </Container>
    </>

}