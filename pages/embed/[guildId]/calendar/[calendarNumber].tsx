import {useRouter} from 'next/router'
import Calendar from "../../../../components/calendar";
import Container from "../../../../components/container";
import {useEffect, useState} from "react";
import {CalendarV3Model} from "../../../../lib/types";
import Loader from "../../../../components/loader";
import Custom500 from "../../../500";
import {useRequestCalendar} from "../../../../lib/service";
import {toast} from "react-toastify";
import Head from "next/head";

export default function CalendarEmbedPage() {
    const router = useRouter()
    const requestCalendar = useRequestCalendar();

    const [data, setData] = useState<CalendarV3Model>()
    const [loginRequired, setLoginRequired] = useState(false)
    const [isLoading, setLoading] = useState(true)

    // FIXME: This is gonna need some logic to handle malformed URLs
    const guildId = router.query.guildId?.toString()
    const calendarNumber = parseInt(router.query.calendarNumber?.toString() ?? "1")

    const fetchCalendarData = async () => {
        // Reset state
        setLoading(true)
        setLoginRequired(false)
        setData(undefined)

        let response = await requestCalendar(guildId as string, calendarNumber)
        console.log(response) //TODO: remove debug log here

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

    useEffect(() => {
        // Need guildId, wait for next render
        if (guildId === undefined) return

        // Get calendar
        fetchCalendarData()
    }, [requestCalendar, guildId])



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
            <Calendar calendar={data}/>
        </Container>
    </>

}