import 'tailwindcss/tailwind.css'
import type {AppProps} from 'next/app'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SessionContext from "../lib/context";
import {useEffect, useState} from "react";
import {loadFromLocalStorage, saveToLocalStorage} from "../lib/utils";
import {ToastContainer} from "react-toastify";
import {injectStyle} from "react-toastify/dist/inject-style";
import Container from "../components/container";
import {Session} from '../lib/types';

export default function MyApp({Component, pageProps}: AppProps) {
    const [session, setSession] = useState(() => {
        // load session from local storage
        let s = loadFromLocalStorage("session", {}) as Session

        // Session expired or invalid
        if (s.expires == null || (new Date(s.expires).valueOf() - new Date().valueOf()) < 0) return {} as Session

        return s
    })
    const value = {session, setSession}

    // Always save the session
    useEffect(() => saveToLocalStorage("session", session), [session])

    // Inject the toastify styles
    if (typeof document !== 'undefined') injectStyle();


    return <SessionContext.Provider value={value}>
        <Navbar/>
        <main className="min-h-screen">
            <Container>
                <Component {...pageProps}/>
            </Container>
            <ToastContainer
                position='bottom-right'
                autoClose={5000}
                newestOnTop
                closeOnClick
                draggable
                pauseOnFocusLoss
                pauseOnHover={true}
            />
        </main>
        <Footer/>
    </SessionContext.Provider>
}
