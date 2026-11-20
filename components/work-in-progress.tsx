import {useRouter} from "next/router";
import Image from "next/image";
import discalDevLogo from "../public/logos/legacy/dev.png"

export default function WorkInProgress() {
    const router = useRouter()

    return <div className="max-w-7xl mx-auto py-8 text-center">
        <Image
            className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 w-xs mx-auto"
            src={discalDevLogo}
            alt="A screenshot from Discord of an embed posted by the DisCal bot. Within the embed is a display
                 of the guild's calendar, broken down by day and listing upcoming events"
        />

        <h1 className="text-3xl font-semibold text-discal-blue uppercase tracking-wide mt-8">
            Work in Progress
        </h1>
        <h1 className="mt-3 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Under Construction
        </h1>
        <p className="mt-4 text-lg font-medium text-discord-greyple">
            This part of the website is a work in progress
        </p>


        <div className="mt-6">
            <button onClick={() => router.back()}
                    className='bg-discal-light-grey text-sm font-medium rounded-md px-4 py-2 text-black
                    hover:bg-discal-blue hover:text-white'>
                Go back
            </button>
        </div>
    </div>
}
