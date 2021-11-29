import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Footer from "../components/footer";

export default function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Component {...pageProps}/>
        <Footer/>
    </>
}
