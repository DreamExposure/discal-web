import React, {Fragment, JSX, useContext} from 'react'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition
} from '@headlessui/react'
import {Bars3Icon, QuestionMarkCircleIcon, XMarkIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'
import {NextRouter, useRouter} from 'next/router'
import SessionContext from "../lib/context";
import {classNames, saveToLocalStorage} from "../lib/utils";
import { User } from '../lib/types'
import Image from "next/image";
import logoImageDark from "../public/logos/dark/transparent/logo.png"
import logoTypeDark from "../public/logos/dark/transparent/logo-type.png"

const navigation = [
    {name: 'Commands', href: '/commands'},
    {name: 'Dashboard', href: '/dashboard'},
    {name: 'Status', href: '/status'},
    {name: 'Invite', href: '/invite'},
    {name: 'Premium', href: '/premium'},
]

function currentPage(router: NextRouter, href: string): Boolean {
    return router.pathname.startsWith(href)
}

export default function Navbar() {
    const {session} = useContext(SessionContext);
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    function MobileMenuButton() {
        return <div className="absolute inset-y-0 left-0 flex items-center sm:hidden" onClick={() => setOpen(!open)}>
            <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md
                                text-discal-light-grey hover:text-white hover:bg-discal-dark-grey focus:outline-none
                                focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                )}
            </DisclosureButton>
        </div>
    }

    function BrandingImage() {
        return (
            <div className="flex-shrink-0 flex items-center">
                <Link href={"/"}>
                    <Image
                        className="block lg:hidden h-8 w-auto"
                        src={logoImageDark}
                        alt="DisCal"
                    />
                    <Image
                        className="hidden lg:block h-8 w-auto"
                        src={logoTypeDark}
                        alt="DisCal"
                    />
                    <span className="sr-only">Homepage</span>
                </Link>
            </div>
        );
    }

    function DesktopNavigationItems() {
        return (
            <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                    {navigation.map((item) => (
                        <Link
                            href={item.href}
                            key={item.name}
                            className={classNames(
                                currentPage(router, item.href) ? 'bg-discal-dark-blue text-white' :
                                    'text-white hover:bg-discal-dark-grey hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={currentPage(router, item.href) ? 'page' : undefined}>
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    function SupportButton() {
        return <a className="bg-discal-dark-blue p-1 rounded-full text-discal-light-grey
            hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-discal-dark-grey
            focus:ring-white mx-2" href="https://discord.gg/2TFqyuy" target={'_blank'} rel="noreferrer"
        >
            <span className="sr-only">Get Support</span>
            <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true"/>
        </a>
    }

    function LoginButton(): JSX.Element {
        return (
            <Link
                href="/login"
                className="bg-discal-dark-blue text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => saveToLocalStorage("previous_page", window.location.href)}>
                
                    Login
                
            </Link>
        );
    }

    function ProfileDropdown(props: {user: User}): JSX.Element {
        return (
            <Menu as="div" className="ml-3 relative">
                <div>
                    <MenuButton
                        className="bg-discal-dark-blue flex text-sm rounded-full focus:outline-none focus:ring-2
                                            focus:ring-offset-2 focus:ring-offset-discal-dark-grey focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <Image className="h-8 w-8 rounded-full"
                             src={props.user.avatar}
                             alt="Profile Photo"
                             width={32}
                             height={32}
                        />
                    </MenuButton>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <MenuItems className="z-[999] origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1
                                            bg-discord-not-quite-black ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                            <p className="block px-4 py-2 text-sm text-discal-light-grey">
                                {props.user.username}#{props.user.discriminator}
                            </p>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                href='/logout'
                                role={"button"}
                                className="block px-4 py-2 text-sm text-discal-red">
                                
                                    Sign out
                                
                            </Link>
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
        );
    }

    function MobileDropdownNav(): JSX.Element {
        return (
            <DisclosurePanel className="sm:hidden" onClick={() => setOpen(!open)}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <Link href={item.href} key={item.name} passHref legacyBehavior>
                            <DisclosureButton
                                as="a"
                                className={classNames(
                                    currentPage(router, item.href) ? 'bg-discal-dark-blue text-white' :
                                        'text-white hover:bg-discal-dark-grey hover:text-white',
                                    'block px-3 py-2 rounded-md text-base font-medium'
                                )}
                                aria-current={currentPage(router, item.href) ? 'page' : undefined}
                            >
                                {item.name}
                            </DisclosureButton>
                        </Link>
                    ))}
                </div>
            </DisclosurePanel>
        );
    }

    return <Disclosure as="nav" className="bg-discal-blue">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
                <MobileMenuButton/>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <BrandingImage/>
                    <DesktopNavigationItems/>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto
                    sm:ml-6 sm:pr-0">
                    <SupportButton/>
                    {session.user != null ? <ProfileDropdown user={session.user}/> : <LoginButton/>}
                </div>
            </div>
        </div>
        <MobileDropdownNav/>
    </Disclosure>
}
