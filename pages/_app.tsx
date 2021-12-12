import 'tailwindcss/tailwind.css'
import type {AppProps} from 'next/app'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {UserContext} from "../lib/context";

export default function MyApp({Component, pageProps}: AppProps) {
    return <UserContext.Provider value={null}>
        <Navbar/>
        <main className="min-h-screen">
            <Component {...pageProps}/>
        </main>
        <Footer/>
    </UserContext.Provider>
}
