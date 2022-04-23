import Head from "next/head";
import Container from "../../components/container";

export default function PrivacyPolicy() {
    return <>
        <Head>
            <title>Privacy Policy - DisCal Bot</title>
        </Head>
        <Container>
            <h1 className='text-3xl font-semibold text-discal-blue uppercase tracking-wide text-center'>
                Privacy Policy
            </h1>

            <p className='text-discal-light-grey pt-10'>
                Personal information collected includes full name, email address, age, credit and/or debit card
                information, billing address, and/or IP addresses. This information is only collected when needed, such
                as when registering for an account or purchasing a product via the online web-store provided by
                DreamExposure.
            </p>

            <p className='text-discal-light-grey pt-5'>
                Personal information is never shared or sold to any third parties or services. Personal information is
                stored on internal services and encrypted. Any credit/debit card information is not stored or accessible
                by DreamExposure. Billing information is handled directly by the service DreamExposure may utilize for
                handling billing (SquareUp, Stripe, PayPal, Patreon).
            </p>

            <p className='text-discal-light-grey pt-5'>
                IP Addresses are only collected for debugging purposes and deleted every rolling 24 hour period. In
                order to debug various API endpoints and pages, IP addresses may be logged. This information is vital to
                assessing issues within DreamExposure&apos;s websites and services.
            </p>

            <p className='text-discal-light-grey pt-5'>
                Passwords for DreamExposure websites are stored in a database and are hashed and salted. Passwords are
                never stored in plaintext.
            </p>

            <p className='text-discal-light-grey pt-20 pb-10 tracking-tight'>
                Last Updated: August 29, 2018.
            </p>
        </Container>
    </>
}
