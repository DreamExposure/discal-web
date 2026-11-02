import FullCalendar from '@fullcalendar/react'
import themePlugin from '@fullcalendar/react/themes/breezy'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import timeGridPlugin from '@fullcalendar/react/timegrid'
import interactionPlugin from '@fullcalendar/react/interaction'
import {toast} from "react-toastify";

// Stylesheets
import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/breezy/theme.css'
import '@fullcalendar/react/themes/breezy/palettes/indigo.css'
import {CalendarV3Model} from "../lib/types";
import {useEffect, useState} from "react";
import {Select} from "@headlessui/react";
import {requestEventsRange} from "../lib/service";
import {discalEventToFullCalendarEvent} from "../lib/utils";

// TODO: see if I can override pallet color without needing entire custom theme


export default function Calendar(props: {calendar: CalendarV3Model, timezones: string[]}) {
    let validTimezones = ['local', 'UTC', ...props.timezones.filter((i) => i !== "UTC")]
    const [selectedTimezone, setSelectedTimezone] = useState(validTimezones[0])

        // TODO: Handlers for on event click and popping event view modal


        // TODO: All the things

    const timezoneSelector = <Select
        aria-label='Displayed timezone'
        className='text-white font-semibold max-w-48'
        onChange={(event) => {
            setSelectedTimezone(event.currentTarget.selectedOptions[0].value)
    }}>
        {validTimezones.map((tz) => <option value={tz} key={tz}>{tz}</option>)}
    </Select>


    return <FullCalendar
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
        timeZone={selectedTimezone}
        displayEventEnd={true}
        eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            omitZeroMinute: true,
            // hour12 would be here, but I really don't want to re-tool to support sending that with the calendar
            timeZoneName: 'short'
        }}
        // TODO: event did mount?
        // TODO: event will unmount?
        eventClick={(info) => {
            info.jsEvent.preventDefault()

            // TODO: Pop modal to show event details
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
}