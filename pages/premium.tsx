import {CheckIcon, XIcon} from '@heroicons/react/solid'
import {classNames} from "../lib/utils";
import type {Feature, Plan, Faq} from "../lib/types";

//TODO: Probably link to a place to actually handle subscribing to the correct tier. Right now it just redirects to patreon
const plans: Plan[] = [
    {
        title: 'Free',
        featured: false,
        description: 'All your essential calendar needs, taken care of',
        priceMonthly: 0,
        priceYearly: 0,
        buyButtonText: 'Get started',
        buyButtonLink: '/invite',
        mainFeatures: [
            {id: 1, value: 'Managed calendar'},
            {id: 2, value: 'Unlimited events'},
            {id: 3, value: 'Unlimited announcements'},
            {id: 4, value: 'No ads, ever'},
        ],
    },
    {
        title: 'Early Access',
        featured: true,
        description: 'Get early access to upcoming features & benefits',
        priceMonthly: 5,
        priceYearly: 60,
        buyButtonText: 'Get Early Access Plan',
        buyButtonLink: 'https://www.patreon.com/Novafox',
        mainFeatures: [
            {id: 1, value: 'Web Dashboard'},
            {id: 2, value: 'Up to 2 calendars'},
            {id: 3, value: 'External calendar support'},
            {id: 4, value: 'Server branding'},
            {id: 5, value: 'RSVP roles'},
            {id: 6, value: 'GIF support in events'},
        ],
    },
    {
        title: 'Large Community',
        featured: false,
        description: 'Extra features to take your community to the next level',
        priceMonthly: 20,
        priceYearly: 240,
        buyButtonText: 'Get Large Community Plan',
        buyButtonLink: 'https://www.patreon.com/Novafox',
        mainFeatures: [
            {id: 1, value: 'Up to 5 calendars'},
            {id: 2, value: 'Activate in up to 3 servers'},
            {id: 3, value: 'More coming soon'},
        ],
    },
]

const features: Feature[] = [
    {
        title: 'Ad free',
        tiers: [
            {title: 'free', value: true},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
    {
        title: 'Unlimited Events',
        tiers: [
            {title: 'free', value: true},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
    {
        title: 'Unlimited Announcements',
        tiers: [
            {title: 'free', value: true},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
    {
        title: 'Auto-updating Calendar View',
        tiers: [
            {title: 'free', value: true},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
    {
        title: 'Calendars',
        tiers: [
            {title: 'free', value: '1 calendar'},
            {title: 'popular', featured: true, value: 'Up to 2 calendars (WIP)'},
            {title: 'large', value: 'Up to 5 calendars (WIP)'},
        ],
    },
    {
        title: 'Multi-Server Support',
        tiers: [
            {title: 'free', value: false},
            {title: 'popular', featured: true, value: '1 server'},
            {title: 'large', value: 'Up to 3 servers'},
        ],
    },
    {
        title: 'Pre-existing Calendar Support (WIP)',
        tiers: [
            {title: 'free', value: false},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
    {
        title: 'Web Dashboard (WIP)',
        tiers: [
            {title: 'free', value: false},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
]

const perks: Feature[] = [
    {
        title: 'Free Support',
        tiers: [
            {title: 'free', value: true},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
    {
        title: 'RSVP',
        tiers: [
            {title: 'free', value: true},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
    {
        title: 'Server Branding',
        tiers: [
            {title: 'free', value: false},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
    {
        title: 'GIF support in events',
        tiers: [
            {title: 'free', value: false},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
    {
        title: 'Announcement Publishing',
        tiers: [
            {title: 'free', value: false},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
    {
        title: 'RSVP Roles',
        tiers: [
            {title: 'free', value: false},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
    {
        title: 'Early access to new features',
        tiers: [
            {title: 'free', value: false},
            {title: 'popular', featured: true, value: true},
            {title: 'large', value: true},
        ],
    },
]

const faqs: Faq[] = [
    {
        question: 'Do I need to get premium?',
        answer: 'No! DisCal is 100% free to use. The premium tiers exist to give some extra quality of life features' +
            ' to those who can help support development of the bot. DisCal and its core features will always be ' +
            '100% FOSS (Free Open Source Software).',
    },
    {
        question: 'I have subscribed on Patreon, how do I get my benefits?',
        answer: 'Join our support server and open a ticket. We are actively working on making this process automatic.',
    },
    {
        question: 'Can I activate premium in multiple servers?',
        answer: 'The "large community" tier allows activating premium in up to 3 servers. ' +
            'Premium can always be transferred to a different server.'
    },
    {
        question: 'How do I cancel or change my premium?',
        answer: 'All you need to do to cancel is go to your Patreon account and manage your membership.',
    },
]

export default function PremiumPage() {
    function Header(): JSX.Element {
        return <div className="relative max-w-2xl mx-auto pt-16 px-4 text-center sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                <span className="block lg:inline">Simple pricing,&nbsp;</span>
                <span className="block lg:inline">no commitment.</span>
            </h1>
            <p className="mt-4 text-xl text-white">
                Everything you need, nothing you don&apos;t. Pick a plan that best suits your business.
            </p>
        </div>
    }

    function Cards(): JSX.Element {
        return <div className="relative mt-8 max-w-2xl mx-auto px-4 pb-8 sm:mt-12 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-0">
            {/* Decorative background */}
            <div aria-hidden="true" className="hidden absolute top-4 bottom-6 left-8 right-8 inset-0
                    bg-discal-dark-blue rounded-tl-lg rounded-tr-lg lg:block"
            />

            <div className="relative space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.title} className={classNames(
                        plan.featured ? 'bg-white ring-2 ring-discal-dark-blue shadow-md' :
                            'bg-discal-dark-blue lg:bg-transparent', 'pt-6 px-6 pb-3 rounded-lg lg:px-8 lg:pt-12'
                    )}>
                        <div>
                            <h3 className={classNames(plan.featured ? 'text-discal-blue' : 'text-white',
                                'text-sm font-semibold uppercase tracking-wide'
                            )}>
                                {plan.title}
                            </h3>
                            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between
                                lg:flex-col lg:items-start"
                            >
                                {/* Plan Pricing */}
                                <div className="mt-3 flex items-center">
                                    <p className={classNames(plan.featured ? 'text-discal-blue' : 'text-white',
                                        'text-4xl font-extrabold tracking-tight'
                                    )}>
                                        ${plan.priceMonthly}
                                    </p>
                                    <div className="ml-4">
                                        <p className={classNames(plan.featured ? 'text-gray-700' : 'text-white', 'text-sm')}>
                                            USD / mo
                                        </p>
                                        <p className={classNames(plan.featured ? 'text-gray-500' : 'text-gray-300', 'text-sm')}>
                                            Billed yearly (${plan.priceYearly})
                                        </p>
                                    </div>
                                </div>

                                {/* Plan Buy Button */}
                                <a href={plan.buyButtonLink} target='_blank' rel='noreferrer' className={
                                    classNames(plan.featured ? 'bg-discal-blue text-white hover:bg-discal-green' :
                                            'bg-white text-discal-blue hover:bg-discal-green hover:text-white',
                                        'mt-6 w-full inline-block py-2 px-8 border border-transparent rounded-md ' +
                                        'shadow-sm text-center text-sm font-medium sm:mt-0 sm:w-auto lg:mt-6 ' +
                                        'lg:w-full'
                                    )}
                                >
                                    {plan.buyButtonText}
                                </a>
                            </div>
                        </div>

                        {/* Plan Features */}
                        <h4 className="sr-only">Features</h4>
                        <ul role="list" className={classNames(plan.featured ? 'border-gray-200 divide-gray-200' :
                                'border-discal-blue divide-discal-blue divide-opacity-75',
                            'mt-7 border-t divide-y lg:border-t-0'
                        )}>
                            {plan.mainFeatures.map((mainFeature) => (
                                <li key={mainFeature.id} className="py-3 flex items-center">
                                    <CheckIcon className='w-5 h-5 flex-shrink-0 text-discal-blue' aria-hidden="true"/>
                                    <span className={classNames(plan.featured ? 'text-discal-dark-grey' : 'text-white',
                                        'ml-3 text-sm font-medium')}
                                    >
                                        {mainFeature.value}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    }

    function FeatureComparisonMobile() {
        function FakeCardBackground(props: { plan: Plan }): JSX.Element {
            return <div aria-hidden="true" className="hidden absolute inset-0 pointer-events-none sm:block">
                <div className={classNames(props.plan.featured ? 'shadow-md' : 'shadow',
                    'absolute right-0 w-1/2 h-full bg-white rounded-lg'
                )}/>
            </div>
        }

        function FakeCardBorder(props: { plan: Plan }): JSX.Element {
            return <div aria-hidden="true" className="hidden absolute inset-0 pointer-events-none sm:block">
                <div className={classNames(props.plan.featured ? 'ring-2 ring-discal-blue' :
                    'ring-1 ring-black ring-opacity-5', 'absolute right-0 w-1/2 h-full rounded-lg'
                )}/>
            </div>
        }

        function ChartCard(props: { plan: Plan, list: Feature[], index: number }): JSX.Element {
            return <div className={classNames(props.plan.featured ? 'ring-2 ring-discal-blue shadow-md' :
                    'ring-1 ring-black ring-opacity-5 shadow',
                'relative py-3 px-4 bg-white rounded-lg sm:p-0 sm:bg-transparent sm:rounded-none sm:ring-0 sm:shadow-none'
            )}>
                <dl className="divide-y divide-gray-200">
                    {props.list.map((feat) => (
                        <div key={feat.title} className="py-3 flex items-center justify-between sm:grid sm:grid-cols-2">
                            <dt className="pr-4 text-sm font-medium text-discal-dark-grey sm:text-gray-300">{feat.title}</dt>
                            <dd className="flex items-center justify-end sm:px-4 sm:justify-center">
                                {typeof feat.tiers[props.index].value === 'string' ? (
                                    <span className={classNames(feat.tiers[props.index].featured ? 'text-discal-blue' :
                                        'text-discal-dark-grey', 'text-sm font-medium'
                                    )}>
                                        {feat.tiers[props.index].value}
                                    </span>
                                ) : (
                                    <>
                                        {feat.tiers[props.index].value === true ? (
                                            <CheckIcon className="mx-auto h-5 w-5 text-discal-blue" aria-hidden="true"/>
                                        ) : (
                                            <XIcon className="mx-auto h-5 w-5 text-gray-500" aria-hidden="true"/>
                                        )}

                                        <span className="sr-only">
                                            {feat.tiers[props.index].value === true ? 'Yes' : 'No'}
                                        </span>
                                    </>
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        }

        return <section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
            <h2 id="mobile-comparison-heading" className="sr-only">
                Feature comparison
            </h2>

            <div className="max-w-2xl mx-auto py-16 px-4 space-y-16 sm:px-6">
                {plans.map((plan, mobilePlanIndex) => (
                    <div key={plan.title} className="border-t border-discal-blue">
                        <div className={classNames(plan.featured ? 'border-discord-blurple' : 'border-transparent',
                            '-mt-px pt-6 border-t-2 sm:w-1/2'
                        )}>
                            <h3 className={classNames(plan.featured ? 'text-discord-blurple' : 'text-white',
                                'text-sm font-bold'
                            )}>
                                {plan.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-300">{plan.description}</p>
                        </div>
                        <h4 className="mt-10 text-sm font-bold text-discord-blurple">Core Features</h4>

                        {/* Features List */}
                        <div className="mt-6 relative">
                            <FakeCardBackground plan={plan}/>

                            <ChartCard plan={plan} list={features} index={mobilePlanIndex}/>

                            <FakeCardBorder plan={plan}/>
                        </div>

                        <h4 className="mt-10 text-sm font-bold text-discord-blurple">Other perks</h4>

                        {/* Perks List */}
                        <div className="mt-6 relative">
                            <FakeCardBackground plan={plan}/>

                            <ChartCard plan={plan} list={perks} index={mobilePlanIndex}/>

                            <FakeCardBorder plan={plan}/>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    }

    function FeatureComparisonDesktop(): JSX.Element {
        function FakeCardBackground(): JSX.Element {
            return <div className="absolute inset-0 flex items-stretch pointer-events-none" aria-hidden="true">
                <div className="w-1/4 pr-4"/>
                <div className="w-1/4 px-4">
                    <div className="w-full h-full bg-white rounded-lg shadow"/>
                </div>
                <div className="w-1/4 px-4">
                    <div className="w-full h-full bg-white rounded-lg shadow-md"/>
                </div>
                <div className="w-1/4 pl-4">
                    <div className="w-full h-full bg-white rounded-lg shadow"/>
                </div>
            </div>
        }

        function FakeCardBorder(): JSX.Element {
            return <div className="absolute inset-0 flex items-stretch pointer-events-none" aria-hidden="true">
                <div className="w-1/4 pr-4"/>
                <div className="w-1/4 px-4">
                    <div className="w-full h-full rounded-lg ring-1 ring-black ring-opacity-5"/>
                </div>
                <div className="w-1/4 px-4">
                    <div className="w-full h-full rounded-lg ring-2 ring-discord-blurple ring-opacity-100"/>
                </div>
                <div className="w-1/4 pl-4">
                    <div className="w-full h-full rounded-lg ring-1 ring-black ring-opacity-5"/>
                </div>
            </div>
        }

        function PlanComparisonHeading(): JSX.Element {
            return <div className="w-full border-t border-gray-200 flex items-stretch">
                <div className="-mt-px w-1/4 py-6 pr-4 flex items-end">
                    <h3 className="mt-auto text-sm font-bold text-discord-blurple">Core Features</h3>
                </div>
                {plans.map((plan, planIdx) => (
                    <div key={plan.title} aria-hidden="true"
                         className={classNames(planIdx === plans.length - 1 ? '' : 'pr-4', '-mt-px pl-4 w-1/4')}
                    >
                        <div className={classNames(plan.featured ? 'border-discord-blurple' : 'border-transparent',
                            'py-6 border-t-2'
                        )}>
                            <p className={classNames(plan.featured ? 'text-discord-blurple' : 'text-white', 'text-sm font-bold')}>
                                {plan.title}
                            </p>
                            <p className="mt-2 text-sm text-gray-300">{plan.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        }

        function ComparisonTable(props: { caption: string, name: string, list: Feature[] }): JSX.Element {
            return <table className="relative w-full">
                <caption className="sr-only">{props.caption}</caption>
                <thead>
                <tr className="text-left">
                    <th scope="col">
                        <span className="sr-only">{props.name}</span>
                    </th>
                    {plans.map((plan) => (
                        <th key={plan.title} scope="col">
                            <span className="sr-only">{plan.title} plan</span>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {props.list.map((feature) => (
                    <tr key={feature.title}>
                        <th scope="row" className="w-1/4 py-3 pr-4 text-left text-sm font-medium text-gray-300">
                            {feature.title}
                        </th>
                        {feature.tiers.map((tier, tierIdx) => (
                            <td key={tier.title} className={classNames(tierIdx === feature.tiers.length - 1 ? 'pl-4' :
                                'px-4', 'relative w-1/4 py-0 text-center'
                            )}>
                        <span className="relative w-full h-full py-3">
                          {typeof tier.value === 'string' ? (
                              <span className={classNames(tier.featured ? 'text-discal-blue' : 'text-discal-dark-grey',
                                  'text-sm font-medium'
                              )}>
                              {tier.value}
                            </span>
                          ) : (
                              <>
                                  {tier.value ? (
                                      <CheckIcon className="mx-auto h-5 w-5 text-discal-blue" aria-hidden="true"/>
                                  ) : (
                                      <XIcon className="mx-auto h-5 w-5 text-gray-500" aria-hidden="true"/>
                                  )}

                                  <span className="sr-only">{tier.value ? 'Yes' : 'No'}</span>
                              </>
                          )}
                        </span>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        }

        return <section aria-labelledby="comparison-heading" className="hidden lg:block">
            <h2 id="comparison-heading" className="sr-only">
                Feature comparison
            </h2>

            <div className="max-w-7xl mx-auto py-24 px-8">
                <PlanComparisonHeading/>

                <div className="relative">
                    <FakeCardBackground/>

                    <ComparisonTable caption={"Core feature comparison"} name={"Feature"} list={features}/>

                    <FakeCardBorder/>
                </div>

                <h3 className="mt-10 text-sm font-bold text-discord-blurple">Other perks</h3>

                <div className="mt-6 relative">
                    <FakeCardBackground/>

                    <ComparisonTable caption={"Perks comparison"} name={"Perk"} list={perks}/>

                    <FakeCardBorder/>
                </div>
            </div>
        </section>
    }

    function FaqSection(): JSX.Element {
        return <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-discord-blurple">Frequently asked questions</h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Can’t find the answer you’re looking for? Reach out in our{' '}
                        <a href="https://discord.gg/2TFqyuy"
                           className="font-medium text-discord-blurple hover:text-discal-green"
                        >
                            support
                        </a>{' '}
                        server.
                    </p>
                </div>
                <div className="mt-12 lg:mt-0 lg:col-span-2">
                    <dl className="space-y-12">
                        {faqs.map((faq) => (
                            <div key={faq.question}>
                                <dt className="text-lg leading-6 font-medium text-discord-blurple">{faq.question}</dt>
                                <dd className="mt-2 text-base text-gray-300">{faq.answer}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    }

    return <>
        <div className="relative bg-discal-blue">
            {/* Overlapping background */}
            <div aria-hidden="true" className="hidden absolute bg-discal-not-black w-full h-6 bottom-0 lg:block"/>

            <Header/>
            <h2 className="sr-only">Plans</h2>
            <Cards/>
        </div>

        <FeatureComparisonMobile/>
        <FeatureComparisonDesktop/>

        <FaqSection/>
    </>
}
