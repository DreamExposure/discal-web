import type {NextPage} from 'next'
import Link from 'next/link'
import {
    CalendarIcon,
    CodeIcon,
    LockClosedIcon,
    SpeakerphoneIcon,
    UserAddIcon,
    ViewListIcon,
} from '@heroicons/react/outline'

function Hero(): JSX.Element {
    function Heading(): JSX.Element {
        return <h1
            className="text-4xl tracking-tight font-extrabold text-discal-light-grey
            sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">A calendar made for your</span>{' '}
            <span className="block text-discord-blurple xl:inline">Discord community</span>
        </h1>
    }

    function Description(): JSX.Element {
        return <p className="mt-3 max-w-md mx-auto text-lg text-discal-light-grey sm:text-xl md:mt-5 md:max-w-3xl">
            A calendar bot made for communities, DisCal integrates directly with calendar services to bring you
            superior support and features. Custom calendars, events, automated reminders and more, ready for
            you, and ready for your community.
        </p>
    }

    function ButtonContainer(): JSX.Element {
        function GetStartedButton(): JSX.Element {
            return <div className="rounded-md shadow">
                <Link href='/invite' passHref>
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base
                    font-medium rounded-md duration-150 text-white bg-indigo-500 hover:bg-indigo-600
                    hover:text-discord-not-quite-black md:py-4 md:text-lg md:px-10">
                        Get Started
                    </a>
                </Link>
            </div>
        }

        function PremiumButton(): JSX.Element {
            return <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href='/premium' passHref>
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base
                    font-medium rounded-md text-discord-blurple bg-opacity-25 bg-white hover:bg-opacity-50 duration-200 md:py-4 md:text-lg
                    md:px-10">
                        Premium
                    </a>
                </Link>
            </div>
        }

        return <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <GetStartedButton/>
            <PremiumButton/>
        </div>
    }

    function MainImage() {
        return <div
            className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            <img
                className="absolute inset-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1588453251771-cd919b362ed4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
                alt="Calendar with muffins and coffee cup"
            />
        </div>
    }

    return <div className='lg:relative'>
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
            <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                <Heading/>
                <Description/>
                <ButtonContainer/>
            </div>
        </div>
        <MainImage/>
    </div>
}

function Example(): JSX.Element {
    return <div className="relative pt-16 overflow-hidden sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
            <div>
                <h2 className="text-base font-semibold tracking-wider text-discord-blurple uppercase">Seamless</h2>
                <p className="mt-2 text-3xl font-extrabold text-discal-green tracking-tight sm:text-4xl">
                    No browser? No problem.
                </p>
                <p className="mt-5 max-w-prose mx-auto text-xl text-discal-light-grey">
                    DisCal is built for your community. Whether it be a study group, card shop, or MMO clan, DisCal is
                    ready for the big screen, focusing attention on making sure everyone is coordinated. With seamless
                    integration of your calendar into Discord, there&apos;s no need to link members to another website.
                </p>
            </div>
            <div className="mt-12 -mb-10 sm:-mb-24 lg:-mb-80">
                <img
                    className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                    src="/screenshots/calendar-overview.png"
                    alt=""
                />
            </div>
        </div>
    </div>
}

function FeatureList(): JSX.Element {
    const features = [
        {
            name: 'Custom Calendars',
            icon: CalendarIcon,
            description: 'Create a fully custom calendar to suit your community\'s needs, without feeling out of place.',
        }, {
            name: 'Unlimited Events',
            icon: ViewListIcon,
            description: 'Have a busy community? DisCal can make sure all your community events are scheduled, no matter the amount.',
        }, {
            name: 'Automated Reminders',
            icon: SpeakerphoneIcon,
            description: 'DisCal\'s announcement system gives you complete control in reminding your community about upcoming events.',
        }, {
            name: 'Integrated RSVP',
            icon: UserAddIcon,
            description: 'Need to know who is planning to attend? Community members can let you know whether they are attending.',
        }, {
            name: 'Privacy First',
            icon: LockClosedIcon,
            description: 'We take your privacy seriously. Data is stored securely and locked down so your community activity stays with you.',
        }, {
            name: 'Continuous Development',
            icon: CodeIcon,
            description: 'DisCal undergoes continuous development with regular bug fixes, improvements, and new features.',
        },
    ]

    function Heading(): JSX.Element {
        return <>
            <h2 className="text-base font-semibold tracking-wider text-discal-blue uppercase">
                Scheduler Easier
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-discal-green tracking-tight sm:text-4xl">
                Everything you need to organize your community
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-discal-light-grey">
                DisCal is the ultimate calendar bot, with a focus on you and your community. Never worry about trying to
                find when everyone is online or which timezone they are in. DisCal makes it simple, fast, and easy.
            </p>
        </>
    }

    function FeatureList(): JSX.Element {
        return <>
            {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                    <div className="flow-root bg-discal-light-grey rounded-lg px-6 pb-8">
                        <div className="-mt-6">
                            <div>
                                <span className="inline-flex items-center justify-center p-3 bg-discal-blue
                                rounded-md shadow-lg">
                                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true"/>
                                </span>
                            </div>
                            <h3 className="mt-8 text-lg font-medium text-discal-dark-blue tracking-tight">
                                {feature.name}
                            </h3>
                            <p className="mt-5 text-base text-discal-dark-grey">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    }

    return <div className="relative py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <Heading/>
            <div className="mt-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <FeatureList/>
                </div>
            </div>
        </div>
    </div>
}

function CTA(): JSX.Element {
    function CTAHeading(): JSX.Element {
        return <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block">Invite DisCal today.</span>
        </h2>
    }

    function InviteButton(): JSX.Element {
        return <Link href='/invite' passHref>
            <a className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center
            text-base font-medium text-discal-blue hover:bg-discal-green hover:text-white">
                Invite DisCal
            </a>
        </Link>
    }

    function CTAImage(): JSX.Element {
        return <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <img className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top
            sm:translate-x-16 lg:translate-y-20"
                 src="/screenshots/calendar-overview.png"
                 alt="App screenshot"
            />
        </div>
    }

    return <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-discal-blue rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:self-center">
                    <CTAHeading/>
                    <p className="mt-4 text-lg leading-6 text-gray-100">
                        Get started in as little as 5 minutes. Create a calendar, schedule an event,
                        create an announcement or two, and you&apos;re all set!
                    </p>
                    <InviteButton/>
                </div>
            </div>
            <CTAImage/>
        </div>
    </div>
}

const Home: NextPage = () => {
    return <>
        <Hero/>
        <Example/>
        <FeatureList/>
        <CTA/>
    </>
}

export default Home
