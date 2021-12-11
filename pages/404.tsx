import {useRouter} from "next/router";

export default function Custom404() {
    const router = useRouter()

    return <main className="min-h-full">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
            <h1 className="text-3xl font-semibold text-discal-blue uppercase tracking-wide">
                404 error
            </h1>
            <h1 className="mt-3 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                Uh oh! I think you’re lost.
            </h1>
            <p className="mt-4 text-lg font-medium text-discord-greyple">
                It looks like the page you’re looking for doesn't exist.
            </p>
            <div className="mt-6">
                    <button onClick={() => router.back()}
                        className='bg-discal-light-grey text-sm font-medium rounded-md px-4 py-2 text-black
                    hover:bg-discal-blue hover:text-white'>
                          Go back
                    </button>
            </div>
        </div>
    </main>


}
