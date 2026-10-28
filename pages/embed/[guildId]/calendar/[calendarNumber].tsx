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
    const [isLoading, setLoading] = useState(true)

    // FIXME: This is gonna need some logic to handle malformed URLs
    const guildId = router.query.guildId?.toString()
    const calendarNumber = parseInt(router.query.calendarNumber?.toString() ?? "1")

    const fetchData = async () => {
        console.log("Hit 1")
        if (guildId === undefined) return

        // FIXME: response handling code is eating network errors... figure out how to deal with that
        let response = await requestCalendar(guildId, calendarNumber)
        console.log(response)
        setData(response)
    }

    useEffect(() => {
        setLoading(true)

        if (guildId === undefined) return

        fetchData()

        /*
        requestCalendar(guildId, calendarNumber).then(data => {
            //FIXME: Apparently the 401 is still hitting this instead of the catch block???... wtf

            console.log("Hit")
            setData(data)
        }).catch(error => {
            // TODO: Handle special case for private calendars

            console.error("Calendar get error", error)
            toast.error("Failed to get calendar")
        }).finally(() => {
            // Always set loading state here for sanity
            setLoading(false)
        })
         */


        // Get calendar
    }, [requestCalendar, guildId])



    if (isLoading) return <Loader/>
    console.log(`data: ${data}`)

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