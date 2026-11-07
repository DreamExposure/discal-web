import FullCalendar, {CalendarRef} from '@fullcalendar/react'
import themePlugin from '@fullcalendar/react/themes/breezy'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import timeGridPlugin from '@fullcalendar/react/timegrid'
import interactionPlugin from '@fullcalendar/react/interaction'
import {toast} from "react-toastify"
import {Select} from "@headlessui/react"
import {useRef, useState} from "react";
import {CalendarV3Model, Event} from "../lib/types"
import {requestEventsRange} from "../lib/service"
import {discalEventToFullCalendarEvent} from "../lib/utils"
import EventViewModal from "./event-view-modal";

// Stylesheets
import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/breezy/theme.css'
import '@fullcalendar/react/themes/breezy/palettes/indigo.css'

// TODO: see if I can override pallet color without needing entire custom theme


export default function Calendar(props: {calendar: CalendarV3Model, timezones: string[]}) {
    const calendarRef = useRef<CalendarRef>(null)

    const validTimezones = ['local', 'UTC', ...props.timezones.filter((i) => i !=='UTC')]

    /*
    FIXME: Okay, apparently updating states rerenders the whole calendar including re-calling the events fetch logic with no way to really control that shit
    I have absolutely literally no idea how to solve this
    like honestly, how do I render event info on click if state changes cause it to wildly update the whole view for no good reason?
    This feels like a bug, but maybe I'm just stupid? I dunno, this is pain... I'm gonna try to mitigate it cuz I dont want to lose functionality from the previous site
     */
    const [selectedEvent, setSelectedEvent] = useState<Event>()
    const [eventModalOpen, setEventModalOpen] = useState(false)


    const timezoneSelector = <Select
        aria-label='Displayed timezone'
        className='text-white font-semibold max-w-48'
        onChange={(event) => {
            calendarRef.current?.getApi().setOption("timeZone", event.currentTarget.selectedOptions[0].value)
        }}>
        {validTimezones.map((tz) => <option value={tz} key={tz}>{tz}</option>)}
    </Select>


    return <>
        <FullCalendar
            ref={calendarRef}
            expandRows={false}
            plugins={[themePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            colorScheme='dark'
            buttons={{
                viewHost: {
                    text: `View on ${props.calendar.host}`,
                    click: () => {
                        window.open(props.calendar.hostLink, '_blank')
                    }
                }
            }}
            toolbarElements={{
                timezoneSelector: timezoneSelector
            }}
            headerToolbar={{
                start: 'prev,next,today timezoneSelector',
                center: 'title',
                end: 'dayGridMonth,timeGridWeek,timeGridDay viewHost'
            }}
            navLinks={true}
            nowIndicator={true}
            slotEventOverlap={true}
            dayMaxEvents={true}
            timeZone='local'
            displayEventEnd={true}
            eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                omitZeroMinute: true,
                // hour12 would be here, but I really don't want to re-tool to support sending that with the calendar
                timeZoneName: 'short'
            }}
            eventClick={(info) => {
                setSelectedEvent(info.event.extendedProps.rawEvent)
                setEventModalOpen(true)
            }}
            events={async (fetchInfo, successCallback, failureCallback) => {
                const response = await requestEventsRange(props.calendar.guildId, props.calendar.number, fetchInfo.start, fetchInfo.end)

                if (response.success) {
                    successCallback(response.data.map((it) => discalEventToFullCalendarEvent(it, false)))
                } else {
                    toast.error(`Failed to get events - ${response.error?.error}`)
                    failureCallback(new Error(response.error?.error ?? `${response.code}`))
                }
            }}
        />
        <EventViewModal open={eventModalOpen} setOpen={setEventModalOpen} event={selectedEvent!}/>
    </>
}