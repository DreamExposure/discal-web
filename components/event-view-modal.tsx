import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react"
import {Event, EventColor} from "../lib/types"
import moment from "moment"
import {MapPinIcon} from "@heroicons/react/16/solid"
import {classNames, recurrenceAsHumanReadable} from "../lib/utils"
import {CodeBracketIcon} from "@heroicons/react/24/outline"


function ModalHeader(props: {event: Event}) {
    return <>
        <DialogTitle as="h3" className="text-lg font-semibold text-white text-center">
            {props.event.name}
        </DialogTitle>
    </>
}

function ModalContent(props: {event: Event}) {

    function EventImage() {
        return <div className='flex justify-center'>
            <img className='max-w-fit rounded-xl' src={props.event.image} alt={props.event.imageAlt}/>
        </div>
    }

    function Description() {
        return <p className='text-sm text-white mt-3'>
            {props.event.description}
        </p>
    }

    function Time() {
        const timeFormat = "dddd, MMMM, Do YYYY, h:mm a z"
        let startString = moment(props.event.start).format(timeFormat)
        let endString = moment(props.event.end).format(timeFormat)

        return <div className='mt-3'>
            <div>
                <label className='text-white font-semibold'>Starts @</label>
                <time className='text-discal-light-grey ml-2' dateTime={props.event.start.toString()}>
                    {startString}
                </time>
            </div>

            <div className='mt-1'>
                <label className='text-white font-semibold'>Ends @</label>
                <time className='text-discal-light-grey ml-2' dateTime={props.event.end.toString()}>
                    {endString}
                </time>
            </div>
        </div>
    }

    function Recurrence() {
        return <div className='mt-1'>
            <p className='text-discal-light-grey'>{recurrenceAsHumanReadable(props.event.recurrence)}</p>
        </div>
    }

    function Location() {
        return <div className='mt-2 flex items-center'>
            <MapPinIcon className='w-10 h-10 text-white p-2 rounded-l-xl bg-discal-not-black'/>
            <p className='text-discal-light-grey bg-discal-dark-blue p-2 rounded-r-xl'>{props.event.location}</p>
        </div>
    }

    function Id() {
        return <div className='mt-16 flex items-center'>
            <CodeBracketIcon className='w-10 h-10 text-white p-2 rounded-l-xl bg-discal-not-black'/>
            <p className='text-discal-light-grey bg-discal-dark-blue p-2 rounded-r-xl'>{props.event.id}</p>
        </div>
    }

    return <div className='mt-3 sm:mt-5'>
        {props.event.image.trim().length > 0 && <EventImage/>}
        {props.event.description.trim().length > 0 && <Description/>}
        <hr className='bg-discal-not-black mt-3'/>
        <Time/>
        {props.event.recur && <Recurrence/>}
        {props.event.location.trim().length > 0 && <Location/>}
        <Id/>

    </div>
}

export function ModalFooter(props: { setOpen: (state: boolean) => void}) {
    return <div className="mt-5 sm:mt-6">
        <button
            type="button"
            onClick={() => props.setOpen(false)}
            className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold
            text-white focus-visible:outline-2 focus-visible:outline-offset-2 bg-discal-dark-blue shadow-none
            hover:bg-discal-blue focus-visible:outline-discal-dark-blue"
        >
            Dismiss
        </button>
    </div>
}



export default function EventViewModal(props: {open: boolean, setOpen: (state: boolean) => void, event: Event}) {
    const eventColor = (props.event?.color ?? EventColor.NONE).toString()

    return <Dialog open={props.open} onClose={props.setOpen} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300
            data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className={classNames(`relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left shadow-xl 
                        transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 
                        data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:p-6 
                        data-closed:sm:translate-y-0 data-closed:sm:scale-95 bg-discal-dark-grey outline 
                        -outline-offset-1 outline-white/10 sm:max-w-xl border-l-8`,
                        // I know this is ugly, but I can't figure out something better that actually feels like working
                        eventColor == 'MELROSE' ? "border-l-google-melrose" :
                        eventColor == 'RIPTIDE' ? "border-l-google-riptide" :
                        eventColor == 'MAUVE' ? "border-l-google-mauve" :
                        eventColor == 'TANGERINE' ? "border-l-google-tangerine" :
                        eventColor == 'DANDELION' ? "border-l-google-dandelion" :
                        eventColor == 'MAC_AND_CHEESE' ? "border-l-google-mac-and-cheese" :
                        eventColor == 'TURQUOISE' ? "border-l-google-turquoise" :
                        eventColor == 'MERCURY' ? "border-l-google-mercury" :
                        eventColor == 'BLUE' ? "border-l-google-blue" :
                        eventColor == 'GREEN' ? "border-l-google-green" :
                        eventColor == 'RED' ? "border-l-google-red" :
                            "border-l-discal-blue"
                    )}
                >
                    <ModalHeader event={props.event}/>

                    <ModalContent event={props.event}/>
                    <ModalFooter setOpen={props.setOpen}/>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
}