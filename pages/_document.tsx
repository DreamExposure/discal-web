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

                    <meta property='og:title' content='DisCal - The Ultimate Calendar Bot'/>
                    <meta property='og:description' content='A calendar bot made for communities,
                        DisCal integrates directly with calendar services to bring you superior support and features.
                        Custom calendars, events, automated reminders and more,
                        ready for you, and ready for your community.'
                    />
                    <meta property='og:site_name' content='DisCal'/>
                    <meta property='og:image' content='/logos/dark/opaque/logo-type.png'/>
                    <meta name='theme-color' content='#5566C2'/>
                    <meta name='twitter:card' content='summary_large_image'/>
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
