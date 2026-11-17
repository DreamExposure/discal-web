import Link from "next/link";
import {saveToLocalStorage} from "../lib/utils";

export default function LoginRequired() {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <h1 className="mt-3 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Looks like you aren't logged in
        </h1>
        <p className="mt-4 text-lg font-medium text-discord-greyple">
            Manage DisCal settings, calendars, and more for guilds you're in by logging in
        </p>
        <div className="mt-6">
            <Link onClick={() => saveToLocalStorage("previous_page", window.location.href)}
                  href='/login'
                  className='bg-discal-light-grey text-sm font-medium rounded-md px-4 py-2 text-black
                    hover:bg-discal-blue hover:text-white'>
                Login with Discord
            </Link>
        </div>
    </div>
}