import 'tailwindcss/tailwind.css'
import type {AppProps} from 'next/app'
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Navbar/>
        <main className="min-h-screen">
            <Component {...pageProps}/>
        </main>
        <Footer/>
    </>
}
