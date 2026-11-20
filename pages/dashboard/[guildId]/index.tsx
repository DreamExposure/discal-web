
import {useContext, useEffect, useState} from "react";
import SessionContext from "../../../lib/context";
import Loader from "../../../components/loader";
import Custom400 from "../../../components/400";
import Head from "next/head";
import Container from "../../../components/container";
import LoginRequired from "../../../components/login-required";
import {useRouter} from "next/router";
import WorkInProgress from "../../../components/work-in-progress";

export default function DashboardIndex() {
    const router = useRouter()
    const {session} = useContext(SessionContext)

    const [loggedIn, setLoggedIn] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const guildId = router.query.guildId?.toString()

    const renderCorrectView = () => {
        if (!loggedIn) return <LoginRequired/>

        if (isLoading) return <Loader/>
        if (isError) return <Custom400/>

        // TODO: Render actual view instead of WIP
        return <WorkInProgress/>
    }

    useEffect(() => {
        setLoggedIn(session.session !== undefined && session.session !== null)

        // TODO: fetch guild data using guild ID in url path
        setLoading(false)
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