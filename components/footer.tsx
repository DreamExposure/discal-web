import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faGithub, faPatreon} from "@fortawesome/free-brands-svg-icons";
import {PropsOf} from "@headlessui/react/dist/types";
import Link from "next/link";
import Image from "next/image"
import logoTypePic from "../public/logos/light/transparent/logo-type.png"

const navigation = {
    discal: [
        {name: 'Premium', href: '/premium'},
        {name: 'Commands', href: '/commands'},
        {name: 'Invite', href: '/invite'},
        {name: 'Support', href: 'https://discord.gg/2TFqyuy'},
    ],
    developers: [
        {name: 'API', href: '/docs/api/reference'},
        {name: 'GitHub', href: 'https://github.com/DreamExposure/DisCal-Discord-Bot'},
    ],
    company: [
        {name: 'DreamExposure', href: 'https://dreamexposure.org'},
        {name: 'TicketBird', href: 'https://ticketbird.dreamexposure.org'},
        {name: 'Contact', href: 'https://discord.gg/2TFqyuy'},
    ],
    legal: [
        {name: 'Privacy', href: '/legal/privacy'},
        {name: 'Terms', href: '/legal/terms'},
    ],
    social: [
        {
            name: 'Discord',
            href: 'https://discord.gg/2TFqyuy',
            icon: (props: PropsOf<any>) => (
                <FontAwesomeIcon icon={faDiscord} {...props}/>
            ),
        },
        {
            name: 'GitHub',
            href: 'https://github.com/DreamExposure/',
            icon: (props: PropsOf<any>) => (
                <FontAwesomeIcon icon={faGithub} {...props}/>
            ),
        },
        {
            name: 'Patreon',
            href: 'https://patreon.com/Novafox',
            icon: (props: PropsOf<any>) => (
                <FontAwesomeIcon icon={faPatreon} {...props}/>
            ),
        },
    ],
}


function Branding() {
    return (
        <div className="space-y-8 xl:col-span-1">
            <Image
                className="h-10 w-fit"
                src={logoTypePic}
                alt="DisCal Bot"
            />
            <p className="text-white text-base">
                The ultimate Discord calendar bot.
            </p>
            <div className="flex space-x-6">
                {navigation.social.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-discord-greyple hover:text-discal-blue">

                        <span className="sr-only">{item.name}</span>
                        <item.icon className={"h-6 w-6"} aria-hidden="true"/>

                    </Link>
                ))}
            </div>
        </div>
    );
}

function DiscalSection() {
    return (
        <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">DisCal</h3>
            <ul role="list" className="mt-4 space-y-4">
                {navigation.discal.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className="text-base text-discord-greyple hover:text-discal-blue">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function DevelopersSection() {
    return (
        <div className="mt-12 md:mt-0">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Developers</h3>
            <ul role="list" className="mt-4 space-y-4">
                {navigation.developers.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className="text-base text-discord-greyple hover:text-discal-blue">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CompanySection() {
    return (
        <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul role="list" className="mt-4 space-y-4">
                {navigation.company.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className="text-base text-discord-greyple hover:text-discal-blue">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function LegalSection() {
    return (
        <div className="mt-12 md:mt-0">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul role="list" className="mt-4 space-y-4">
                {navigation.legal.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className="text-base text-discord-greyple hover:text-discal-blue">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function LinksBlock() {
    return <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
        <div className="md:grid md:grid-cols-2 md:gap-8">
            <DiscalSection/>
            <DevelopersSection/>
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-8">
            <CompanySection/>
            <LegalSection/>
        </div>
    </div>
}

export default function Footer() {
    return <footer className="bg-discal-not-black border-t border-discal-blue mt-10" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
            Footer
        </h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <Branding/>
                <LinksBlock/>
            </div>
            <div className="mt-12 border-t border-white pt-8">
                <p className="text-base text-discord-greyple xl:text-center">
                    Copyright &copy; 2017 - {new Date().getFullYear()} DreamExposure Studios - Licensed under GPLv3
                </p>
            </div>
        </div>
    </footer>
}
