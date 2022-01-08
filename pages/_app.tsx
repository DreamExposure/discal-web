import 'tailwindcss/tailwind.css'
import type {AppProps} from 'next/app'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SessionContext from "../lib/context";
import {useEffect, useState} from "react";
import Session from "../lib/object/session";
import {StorageUtil} from "../lib/utils";

export default function MyApp({Component, pageProps}: AppProps) {
    const [session, setSession] = useState(() => {
        // load session from local storage
        let s = StorageUtil.load("session", new Session()) as Session

        // Session expired or invalid
        if (s.expires == null || (s.expires.valueOf() - new Date().valueOf() < 0)) return new Session()

        return s
    })
    const value = { session, setSession }

    // Always save the session
    useEffect(() => {
        StorageUtil.save("session", session)
    }, [session])

    return <SessionContext.Provider value={value}>
        <Navbar/>
        <main className="min-h-screen">
            <Component {...pageProps}/>
        </main>
        <Footer/>
    </SessionContext.Provider>
}
