import 'tailwindcss/tailwind.css'
import type {AppProps} from 'next/app'
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Navbar/>
        <Component {...pageProps}/>
        <Footer/>
    </>
}
