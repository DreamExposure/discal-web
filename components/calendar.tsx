import FullCalendar from '@fullcalendar/react'
import themePlugin from '@fullcalendar/react/themes/breezy'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import timeGridPlugin from '@fullcalendar/react/timegrid'
import interactionPlugin from '@fullcalendar/react/interaction'

// Stylesheets
import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/breezy/theme.css'
import '@fullcalendar/react/themes/breezy/palettes/indigo.css'
import {CalendarV3Model} from "../lib/types";

// TODO: see if I can override pallet color without needing entire custom theme


export default function Calendar(props: {calendar: CalendarV3Model}) {
        // TODO: handle loading state while fetching data to render initial view
        // TODO: Fetch initial data
        // TODO: Handlers for on event click and popping event view modal
        // TODO: Handlers for fetching events on view change
        // TODO: Custom button to view on 3rd party host
        // TODO: timezone selector


        // TODO: All the things


    return <FullCalendar
        className='' // TODO: Add proper padding/sizing???
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
        headerToolbar={{
            start: 'prev,next,today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay viewHost'
        }}
        navLinks={true}
        nowIndicator={true}
        slotEventOverlap={true}
        dayMaxEvents={true}
        // TODO: timezone
        displayEventEnd={true}
        // TODO: event color
        eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            omitZeroMinute: true,
            // TODO: hour12
            timeZoneName: 'short'
        }}
        // TODO: event did mount?
        // TODO: event will unmount?
        eventClick={(info) => {
            info.jsEvent.preventDefault()

            // TODO: Pop modal to show event details
        }}
        // TODO: events


    />
}