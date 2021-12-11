import Document, {Head, Html, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html className='bg-discal-not-black'>
                <Head>
                    <link rel="icon" href="/favicon.ico"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="manifest" href="/site.webmanifest"/>

                    <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
