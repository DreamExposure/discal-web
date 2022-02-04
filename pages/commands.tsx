import type {NextPage} from 'next'
import React from 'react';
import Container from "../components/container";
import {Props} from "../lib/utils";

// Table building components
type RowProps = {
    command: string,
    description: string,
    usage: String,
    access: String,
}

function CommandTable(props: Props): JSX.Element {
    return <table className='min-w-full' aria-label={props.caption + ' table'}>
        <caption className='hidden'>{props.caption}</caption>
        <thead>
        <tr className='bg-discal-light-grey text-discal-not-black border-l border-r border-b border-discal-light-grey'
            role='rowgroup'>
            <th className='w-full md:w-1/6 py-2 text-center block md:table-cell' role='columnheader'>Command</th>
            <th className='w-2/6 py-2 text-left hidden md:table-cell' role='columnheader'>Description</th>
            <th className='w-2/6 py-2 text-left hidden md:table-cell' role='columnheader'>Usage</th>
            <th className='w-1/6 py-2 text-left hidden md:table-cell' role='columnheader'>Access</th>
        </tr>
        </thead>
        <tbody>
        {props.children}
        </tbody>
    </table>
}

function Row(props: RowProps): JSX.Element {
    return <tr className='bg-light-grey border-l border-r border-b border-discal-light-grey' role='rowgroup'>
        <td className='p-3 block md:table-cell text-left md:text-center text-discord-blurple'>{props.command}</td>
        <td className='p-3 block md:table-cell text-left text-white'>{props.description}</td>
        <td className='p-3 block md:table-cell text-left text-discord-greyple opacity-75'>{props.usage}</td>
        <td className='p-3 block md:table-cell text-left text-discal-red'>{props.access}</td>
    </tr>
}
/*
<Row command=''
     description=''
     usage=''
     access=''
/>
*/

// Page content components

function Permissions(): JSX.Element {
    return <React.Fragment>
        <p className='text-discal-light-grey'>
            DisCal uses a simple-to-understand permission scheme for handling access to commands.
        </p>

        <h6 className='text-discal-red tracking-wide uppercase mt-2'>Elevated</h6>
        <p className='text-discal-light-grey'>
            Requires ADMINISTRATOR or MANAGE_SERVER permission nodes, or being the guild owner
        </p>

        <h6 className='text-discal-blue tracking-wide uppercase mt-2'>Privileged</h6>
        <p className='text-discal-light-grey'>
            Requires DisCal control role (default control role is @everyone)
        </p>

        <h6 className='text-discal-blue tracking-wide uppercase mt-2'>Everyone</h6>
        <p className='text-discal-light-grey'>
            Everyone will always be able to access (unless commands are disabled for the channel)
        </p>

        <h6 className='text-discal-blue tracking-wide uppercase mt-2'>Patron-Only</h6>
        <p className='text-discal-light-grey'>
            Requires guild to be a patron-guild at the early access tier or higher
        </p>

        <h6 className='text-discal-blue tracking-wide uppercase mt-2'>Dev-Only</h6>
        <p className='text-discal-light-grey'>
            Only DisCal Developers are able to use these commands
        </p>
    </React.Fragment>
}

function CalendarCommandTable(): JSX.Element {
    return <CommandTable caption='/calendar commands'>
        <Row command='create'
             description='Starts cal create wizard'
             usage='/calendar create [name]'
             access='elevated'
        />
        <Row command='name'
             description='Sets the calendar&apos;s name'
             usage='/calendar name [name]'
             access='elevated'/>
        <Row command='description'
             description='Sets the calendar&apos;s description'
             usage='/calendar description [description]'
             access='elevated'
        />
        <Row command='timezone'
             description='Sets the calendar&apos;s timezone'
             usage='/calendar timezone [timezone]'
             access='elevated'
        />
        <Row command='review'
             description='Displays calendar properties'
             usage='/calendar review'
             access='elevated'
        />
        <Row command='confirm'
             description='Commits the changes made in the wizard'
             usage='/calendar confirm'
             access='elevated'
        />
        <Row command='cancel'
             description='Cancels the wizard'
             usage='/calendar cancel'
             access='elevated'
        />
        <Row command='delete'
             description='Deletes the calendar'
             usage='/calendar delete (calendar)'
             access='elevated'
        />
        <Row command='edit'
             description='Starts the edit wizard'
             usage='/calendar edit (calendar)'
             access='elevated'
        />
    </CommandTable>
}

function DisplayCalendarCommandTable(): JSX.Element {
    return <CommandTable caption='/displaycal commands'>
        <Row command='new'
             description='Creates a new auto-updating calendar overview message'
             usage='/displaycal new (time) (calendar)'
             access='elevated'
        />
        <Row command='update'
             description='Updates an existing calendar overview'
             usage='/displaycal update [message-id]'
             access='elevated'
        />
    </CommandTable>
}

function EventCommandTable(): JSX.Element {
    return <CommandTable caption='/event commands'>
        <Row command='view'
             description='Displays the event&apos;s details'
             usage='/event view [event-id] (calendar)'
             access='everyone'
        />
        <Row command='create'
             description='Starts the event create wizard'
             usage='/event create (name) (calendar)'
             access='privileged'
        />
        <Row command='name'
             description='Sets the event&apos;s name'
             usage='/event name [name]'
             access='privileged'
        />
        <Row command='description'
             description='Sets the event&apos;s description'
             usage='/event description [desc]'
             access='privileged'
        />
        <Row command='start'
             description='Sets the event&apos;s start'
             usage='/event start [yyyy] [MM] [dd] (hh) (mm)'
             access='privileged'
        />
        <Row command='end'
             description='Sets the event&apos;s end'
             usage='/event end [yyyy] [MM] [dd] (hh) (mm)'
             access='privileged'
        />
        <Row command='color'
             description='Sets the event&apos;s color'
             usage='/event color [color]'
             access='privileged'
        />
        <Row command='location'
             description='Sets the event&apos;s location'
             usage='/event location [location]'
             access='privileged'
        />
        <Row command='image'
             description='Sets the event&apos;s image'
             usage='/event image [link]'
             access='privileged, gif support patron-only'
        />
        <Row command='recur'
             description='Toggles whether the event recurs, and how it recurs'
             usage='/event recur (enable) (frequency) (interval) (count)'
             access='privileged'
        />
        <Row command='review'
             description='Displays the event&apos;s properties'
             usage='/event review'
             access='privileged'
        />
        <Row command='confirm'
             description='Commits the changes made in the wizard'
             usage='/event confirm'
             access='privileged'
        />
        <Row command='cancel'
             description='Cancels the wizard'
             usage='/event cancel'
             access='privileged'
        />
        <Row command='edit'
             description='Starts the event edit wizard'
             usage='/event edit [event-id] (calendar)'
             access='privileged'
        />
        <Row command='copy'
             description='Copies an existing event&apos;s details to a new event'
             usage='/event copy [event-id] (calendar) (target-cal)'
             access='privileged'
        />
        <Row command='delete'
             description='Deletes an event'
             usage='/event delete [event-id] (calendar)'
             access='privileged'
        />
    </CommandTable>
}

function EventsCommandTable(): JSX.Element {
    return <CommandTable caption='/events commands'>
        <Row command='upcoming'
             description='Lists the next X upcoming events'
             usage='/events upcoming (number) (calendar)'
             access='everyone'
        />
        <Row command='ongoing'
             description='Lists the ongoing events'
             usage='/events ongoing (calendar)'
             access='everyone'
        />
        <Row command='today'
             description='Lists the events occurring in the next 24 hours'
             usage='/events today (calendar)'
             access='everyone'
        />
        <Row command='range'
             description='Lists the events found in the date range provided'
             usage='/events range [yyyy/MM/dd] [yyyy/MM/dd] (calendar)'
             access='everyone'
        />
    </CommandTable>
}

function RsvpCommandTable(): JSX.Element {
    return <CommandTable caption='/rsvp commands'>
        <Row command='ontime'
             description='RSVPs as going to the event on time'
             usage='/rsvp ontime [event-id] (calendar)'
             access='everyone'
        />
        <Row command='late'
             description='RSVPs as going to the event, but arriving late'
             usage='/rsvp late [event-id] (calendar)'
             access='everyone'
        />
        <Row command='not'
             description='RSVPs as not going to the event'
             usage='/rsvp not [event-id] (calendar)'
             access='everyone'
        />
        <Row command='unsure'
             description='RSVPs are unsure if you will be able to attend'
             usage='/rsvp unsure [event-id] (calendar)'
             access='everyone'
        />
        <Row command='remove'
             description='Removes your RSVP status from the event'
             usage='/rsvp remove [event-id] (calendar)'
             access='everyone'
        />
        <Row command='list'
             description='Lists who as RSVPed to the event'
             usage='/rsvp list [event-id] (calendar)'
             access='everyone'
        />
        <Row command='limit'
             description='Sets the max number of people allowed to attend. -1 to disable the limit'
             usage='/rsvp limit [event-id] [limit] (calendar)'
             access='privileged'
        />
        <Row command='role'
             description='Sets the role assigned when RSVPed to the event. "@everyone" to disable.
              *Note: these roles are currently not automatically removed'
             usage='/rsvp role [event-id] [role] (calendar)'
             access='elevated, patron-only'
        />
    </CommandTable>
}

function AnnouncementCommandTable(): JSX.Element {
    return <CommandTable caption='/announcement commands'>
        <Row command='create'
             description='Starts the announcement create wizard'
             usage='/announcement create (type) (channel) (minutes) (hours) (calendar)'
             access='privileged'
        />
        <Row command='type'
             description='Sets the announcement type. Valid types: UNIVERSAL, SPECIFIC, COLOR, RECUR'
             usage='/announcement type [type]'
             access='privileged'
        />
        <Row command='event'
             description='Sets the announcement&apos;s event. Only needed when using SPECIFIC or RECUR types'
             usage='/announcement event [event-id]'
             access='privileged'
        />
        <Row command='color'
             description='Sets the announcement&apos;s color. Only needed when using COLOR type'
             usage='/announcement color [color]'
             access='privileged'
        />
        <Row command='channel'
             description='Sets the channel the announcement will be posted in'
             usage='/announcement channel [channel]'
             access='privileged'
        />
        <Row command='minutes'
             description='Sets the minutes before an event to announce. Added to hours'
             usage='/announcement minutes [number]'
             access='privileged'
        />
        <Row command='hours'
             description='Sets the hours before an event to announce. Added to minutes'
             usage='/announcement hours [number]'
             access='privileged'
        />
        <Row command='info'
             description='Sets the additional info to be posted along with the event. No text input to remove'
             usage='/announcement info (text)'
             access='privileged'
        />
        <Row command='calendar'
             description='Sets the calendar the announcement  will read from. Defaults to 1 (main calendar)'
             usage='/announcement calendar [calendar]'
             access='privileged'
        />
        <Row command='publish'
             description='Toggles if the announcement should be cross-posted'
             usage='/announcement publish [true/false]'
             access='privileged, patron-only'
        />
        <Row command='review'
             description='Displays the announcement properties in the wizard'
             usage='/announcement review'
             access='privileged'
        />
        <Row command='confirm'
             description='Commits the changes made in the wizard'
             usage='/announcement confirm'
             access='privileged'
        />
        <Row command='cancel'
             description='Cancels the announcement wizard'
             usage='/announcement cancel'
             access='privileged'
        />
        <Row command='edit'
             description='Starts the announcement edit wizard'
             usage='/announcement edit [announcement-id]'
             access='privileged'
        />
        <Row command='copy'
             description='Copies an existing announcement to a new one'
             usage='/announcement copy [announcement-id]'
             access='privileged'
        />
        <Row command='delete'
             description='Deletes an announcement'
             usage='/announcement delete [announcement-id]'
             access='privileged'
        />
        <Row command='enable'
             description='Sets whether an announcement is enabled'
             usage='/announcement enable [announcement-id] [true/false]'
             access='privileged'
        />
        <Row command='view'
             description='Displays an existing announcement&apos;s properties'
             usage='/announcement view [announcement-id]'
             access='everyone'
        />
        <Row command='list'
             description='Lists announcements, -1 for all'
             usage='/announcement list [amount]'
             access='everyone'
        />
        <Row command='subscribe'
             description='Subscribes to an announcement to be pinged when it is posted'
             usage='/announcement subscribe [announcement-id] (user/role)'
             access='everyone'
        />
        <Row command='unsubscribe'
             description='Unsubscribes to an announcement, to stop being pinged when it is posted'
             usage='/announcement unsubscribe [announcement-id] (user/role)'
             access='everyone'
        />
    </CommandTable>
}

function SettingsCommandTable(): JSX.Element {
    return <CommandTable caption='/settings commands'>
        <Row command='view'
             description='Displays the current settings for the guild'
             usage='/settings view'
             access='elevated'
        />
        <Row command='role'
             description='Sets the role required to use privileged commands'
             usage='/settings role [role]'
             access='elevated'
        />
        <Row command='announcement-style'
             description='Changes the style announcements will bbe posted as'
             usage='settings announcement-style [style]'
             access='elevated'
        />
        <Row command='language'
             description='Changes the language the bot will use in responses'
             usage='/settings language [lang]'
             access='elevated'
        />
        <Row command='time-format'
             description='Changes what format to display date/time when needed'
             usage='/settings time-format [format]'
             access='elevated'
        />
        <Row command='branding'
             description='Toggles between using discal branding or the guild&apos; name/image where possible'
             usage='settings branding [true/false]'
             access='elevated, patron-only'
        />
    </CommandTable>
}

function OtherCommandsTable(): JSX.Element {
    return <CommandTable caption='other commands'>
        <Row command='discal'
             description='Displays information about the bot'
             usage='/discal'
             access='everyone'
        />
        <Row command='linkcal'
             description='Provides info and a link to view the guild&apos;s calendar'
             usage='/linkcal (calendar)'
             access='everyone'
        />
        <Row command='time'
             description='Displays the current time as seen by the calendar&apos;s timezone'
             usage='/time (calendar)'
             access='everyone'
        />
        <Row command='addCal (WIP)'
             description='Starts the process to add a pre-existing calendar'
             usage='/addCal'
             access='patron-only, dev-only (work in progress)'
        />
        <Row command='help'
             description='Links to the commands page'
             usage='/help'
             access='everyone'
        />
    </CommandTable>
}

const Commands: NextPage = () => {
    return (
        <Container>
            <h1 className="text-4xl font-semibold text-discal-blue uppercase tracking-wide text-center my-5">
                Commands
            </h1>
            <Permissions/>
            <hr className='mt-10 border-discal-blue'/>

            <h2 className='text-2xl font-semibold text-discal-blue uppercase tracking-wide text-left my-5'>
                /calendar commands
            </h2>
            <CalendarCommandTable/>
            <hr className='mt-10 border-discal-blue'/>

            <h2 className='text-2xl font-semibold text-discal-blue uppercase tracking-wide text-left my-5'>
                /displaycal commands
            </h2>
            <DisplayCalendarCommandTable/>
            <hr className='mt-10 border-discal-blue'/>

            <h2 className='text-2xl font-semibold text-discal-blue uppercase tracking-wide text-left my-5'>
                /event commands
            </h2>
            <EventCommandTable/>
            <hr className='mt-10 border-discal-blue'/>

            <h2 className='text-2xl font-semibold text-discal-blue uppercase tracking-wide text-left my-5'>
                /events commands
            </h2>
            <EventsCommandTable/>
            <hr className='mt-10 border-discal-blue'/>

            <h2 className='text-2xl font-semibold text-discal-blue uppercase tracking-wide text-left my-5'>
                /rsvp commands
            </h2>
            <RsvpCommandTable/>
            <hr className='mt-10 border-discal-blue'/>

            <h2 className='text-2xl font-semibold text-discal-blue uppercase tracking-wide text-left my-5'>
                /announcement commands
            </h2>
            <AnnouncementCommandTable/>
            <hr className='mt-10 border-discal-blue'/>

            <h2 className='text-2xl font-semibold text-discal-blue uppercase tracking-wide text-left my-5'>
                /settings commands
            </h2>
            <SettingsCommandTable/>
            <hr className='mt-10 border-discal-blue'/>

            <h2 className='text-2xl font-semibold text-discal-blue uppercase tracking-wide text-left my-5'>
                All other commands
            </h2>
            <OtherCommandsTable/>

        </Container>
    )
}

export default Commands
