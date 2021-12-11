import {NextPage} from "next";
import Container from "../../components/container";

const TermsOfService: NextPage = () => {
    return <Container>
        <h1 className='text-3xl font-semibold text-discal-blue uppercase tracking-wide text-center'>
            Terms of Service
        </h1>

        <p className='text-discal-light-grey pt-10'>
            DisCal&apos;s development team and parent, DreamExposure, puts user privacy, safety, and comfort above all
            else.
            In using DisCal, directly or indirectly, the user agrees to the following points.
        </p>

        <h2 className='text-xl font-semibold text-discal-blue uppercase tracking-wide text-center pt-10'>
            Definitions
        </h2>

        <ul className='text-discal-light-grey pt-10 space-y-4'>
            <li>
                &quot;Users&quot; refers to any individual that directly utilizes DisCal. Either via the official
                website,
                https://www.discalbot.com, command interaction with DisCal via Discord, and/or any form of communication
                whereas the user talks/texts to the DisCal bot.
            </li>
            <li>
                &quot;Us/We&quot; refers to DreamExposure, the group that develops and maintains DisCal. DreamExposure
                is
                comprised of multiple members who program the bot, aid users with support and help in regards to the
                DisCal bot and/or DisCal website
            </li>
            <li>
                &quot;Data&quot; refers to any user entered information provided to DisCal. This information includes
                dates/times,
                timezones, locations, event details, Discord user information, and other public data.
            </li>
        </ul>


        <h2 className='text-xl font-semibold text-discal-blue uppercase tracking-wide text-center pt-10'>
            Agreements
        </h2>

        <ul className='text-discal-light-grey pt-10 space-y-4'>
            <li>
                We prioritize privacy and security, therefore the servers and systems that DreamExposure manages
                relating to DisCal are kept encrypted behind firewalls. Regular virus scans are conducted to ensure the
                system is not compromised.
            </li>
            <li>
                Data entered into the DisCal system is kept on an encrypted drive. This data is not accessible by anyone
                but the user directly entering the information, and the users in the Discord Server that the user is in.
            </li>
            <li>
                Users, whether using DisCal directly or indirectly will not attempt to bypass or otherwise compromise
                DreamExposure&apos;s servers, systems, or products. Any attempt to render DreamExposure undue harm can result
                in legal action.
            </li>
            <li>
                DisCal provides the ability to attach images to calendar events. These images are not stored or hosted
                on DreamExposure systems. DreamExposure is not liable and does not allow for any illegal content
                submitted by the user, including but not limited to proof of drug use, child pornography, etc. Should
                DreamExposure find this content, the user will can and will be reported to the appropriate authorities.
            </li>
            <li>
                Users are directly liable, legal or otherwise, for all content and data entered into DisCal.
            </li>
            <li>
                DisCal utilizes the Google Calendar APIs and Discord APIs. DisCal is simply a bridge between the two. By
                using DisCal the user also agrees to the Google Terms or Service and Discord Terms of Service.
            </li>
            <li>
                DreamExposure reserves the right to revoke access to DisCal if a user attempts to break the above Terms
                of Service.
            </li>
        </ul>

        <p className='text-discal-light-grey pt-20 pb-10 tracking-tight'>
            Last edited: August 29, 2018.
        </p>
    </Container>
}

export default TermsOfService
