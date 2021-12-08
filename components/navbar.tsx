import React, {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {MenuIcon, QuestionMarkCircleIcon, XIcon} from '@heroicons/react/outline'
import Link from 'next/link'

//TODO: Move this to global state
const navigation = [
    {name: 'Commands', href: '/commands', current: false},
    {name: 'Dashboard', href: '/dashboard', current: false},
    {name: 'Status', href: '/status', current: false},
    {name: 'Invite', href: '/invite', current: false},
    {name: 'Premium', href: '/premium', current: false},
]

//TODO: Move this to global state
const loggedIn = false

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const [open, setOpen] = React.useState(false)

    function mobileMenuButton() {
        return <div className="absolute inset-y-0 left-0 flex items-center sm:hidden" onClick={() => setOpen(!open)}>
            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md
                                text-discal-light-grey hover:text-white hover:bg-discal-dark-grey focus:outline-none
                                focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true"/>
                ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                )}
            </Disclosure.Button>
        </div>
    }

    function brandingImage() {
        return <div className="flex-shrink-0 flex items-center">
            <Link href={"/"}>
                <a>
                    <img
                        className="block lg:hidden h-8 w-auto"
                        src="/logos/dark/transparent/logo.png"
                        alt="DisCal"
                    />
                    <img
                        className="hidden lg:block h-8 w-auto"
                        src="/logos/dark/transparent/logo-type.png"
                        alt="DisCal"
                    />
                    <span className="sr-only">Homepage</span>
                </a>
            </Link>
        </div>
    }

    function desktopNavigationItems() {
        return <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
                {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-discal-dark-blue text-white' :
                                'text-discal-light-grey hover:bg-discal-dark-grey hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </div>
    }

    function supportButton() {
        return <a className="bg-discal-dark-blue p-1 rounded-full text-discal-light-grey
            hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-discal-dark-grey
            focus:ring-white mx-2" href="https://discord.gg/2TFqyuy" target={'_blank'} rel="noreferrer"
        >
            <span className="sr-only">Get Support</span>
            <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true"/>
        </a>
    }

    function loginButton() {
        return <a href="/login" className="bg-discal-dark-blue text-white px-3 py-2 rounded-md text-sm font-medium">
            Login
        </a>
    }

    function profileDropdown() {
        return <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button
                    className="bg-discal-dark-blue flex text-sm rounded-full focus:outline-none focus:ring-2
                                        focus:ring-offset-2 focus:ring-offset-discal-dark-grey focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    {/* TODO: Use discord profile picture if one exists */}
                    <img className="h-8 w-8 rounded-full"
                         src="/defaults/profile.png"
                         alt="Profile Photo"
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1
                                        bg-discord-not-quite-black ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        <p className="block px-4 py-2 text-sm text-discal-light-grey">
                            Username#1234
                        </p>
                    </Menu.Item>
                    <Menu.Item>
                        <a href="#" className="block px-4 py-2 text-sm text-discal-red">
                            Sign out
                        </a>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    }

    function mobileDropdownNav() {
        return <Disclosure.Panel className="sm:hidden" onClick={() => setOpen(!open)}>
            <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                    <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-discal-dark-blue text-white' :
                                'text-discal-light-grey hover:bg-discal-dark-grey hover:text-white',
                            'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        {item.name}
                    </Disclosure.Button>
                ))}
            </div>
        </Disclosure.Panel>
    }

    return (
        <Disclosure as="nav" className="bg-discal-blue">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {mobileMenuButton()}
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        {brandingImage()}
                        {desktopNavigationItems()}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto
                    sm:ml-6 sm:pr-0">
                        {supportButton()}
                        {loggedIn ? profileDropdown() : loginButton()}
                    </div>
                </div>
            </div>

            {mobileDropdownNav()}
        </Disclosure>
    )
}
