import '../styles/globals.css'
import '../styles/colors.css'
import type {AppProps} from 'next/app'
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Navbar/>
        <Component {...pageProps}/>
        <Footer/>
    </>
}
