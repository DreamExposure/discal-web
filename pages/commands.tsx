import React, {JSX} from 'react';
import {CommandAccessLevel, CommandTableData} from '../lib/types';
import Container from '../components/container';
import CommandTable from '../components/command-table';
import Head from 'next/head';
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react';
import {MinusIcon, PlusIcon} from '@heroicons/react/24/outline';

// Definition for all commands so tables can be built dynamically
const allCommands: CommandTableData[] = [
    {
        title: '/calendar commands',
        commands: [
            {
                command: 'view',
                description: 'Provides info and a link to the Guild\'s calendar',
                usage: '/calendar view (overview) (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'list',
                description: 'Lists all calendars owned by the guild',
                usage: '/calendar list',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'create',
                description: 'Starts calendar create wizard',
                usage: '/calendar create [name] (desc) (timezone) (host)',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'name',
                description: 'Sets the calendar\'s name',
                usage: '/calendar name [name]',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'description',
                description: 'Sets the calendar\'s description',
                usage: '/calendar description [description]',
                access: {renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'timezone',
                description: 'Sets the calendar\'s timezone',
                usage: '/calendar timezone [timezone]',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'review',
                description: 'Displays calendar wizard properties',
                usage: '/calendar review',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'confirm',
                description: 'Commits the changes made in the wizard',
                usage: '/calendar confirm',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'cancel',
                description: 'Cancels the calendar wizard',
                usage: '/calendar cancel',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'delete',
                description: 'Deletes the calendar',
                usage: '/calendar delete (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'edit',
                description: 'Starts the calendar edit wizard',
                usage: '/calendar edit (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
        ],
    },
    {
        title: '/displaycal commands',
        commands: [
            {
                command: 'new',
                description: 'Creates a new auto-updating calendar overview message',
                usage: '/displaycal new (time) (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
        ]
    },
    {
        title: '/event commands',
        commands: [
            {
                command: 'view',
                description: 'Displays the event\'s details',
                usage: '/event view [event-id] (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'create',
                description: 'Starts the event create wizard',
                usage: '/event create (name) (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'name',
                description: 'Sets the event\'s name',
                usage: '/event name [name]',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'description',
                description: 'Sets the event\'s description',
                usage: '/event description [desc]',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'start',
                description: 'Sets the event\'s start',
                usage: '/event start [yyyy] [MM] [dd] (hh) (mm) (keep-duration)',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'end',
                description: 'Sets the event\'s end',
                usage: '/event end [yyyy] [MM] [dd] (hh) (mm) (keep-duration)',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'color',
                description: 'Sets the event\'s color',
                usage: '/event color [color]',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'location',
                description: 'Sets the event\'s location',
                usage: '/event location [location]',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'image',
                description: 'Sets the event\'s image',
                usage: '/event image [link]',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged, alternateText: 'Privileged, gif support patron-only' },
            },
            {
                command: 'recur',
                description: 'Toggles whether the event recurs, and how it recurs',
                usage: '/event recur (enable) (frequency) (interval) (count)',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'review',
                description: 'Displays the event wizard\'s properties',
                usage: '/event review',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'confirm',
                description: 'Commits the changes made in the wizard',
                usage: '/event confirm',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'cancel',
                description: 'Cancels the event wizard',
                usage: '/event cancel',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'edit',
                description: 'Starts the event edit wizard',
                usage: '/event edit [event-id] (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'copy',
                description: 'Copies an existing event\'s details to a new event',
                usage: '/event copy [event-id] (calendar) (target-cal)',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'delete',
                description: 'Deletes an event',
                usage: '/event delete [event-id] (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
        ],
    },
    {
        title: '/events commands',
        commands: [
            {
                command: 'upcoming',
                description: 'Lists the next N upcoming events',
                usage: '/events upcoming (number) (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'ongoing',
                description: 'Lists any ongoing events',
                usage: '/events ongoing (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'today',
                description: 'Lists the events occurring in the next 24 hours',
                usage: '/events today (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'range',
                description: 'Lists the events found in the date range provided',
                usage: '/events range [yyyy/MM/dd] [yyyy/MM/dd] (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
        ],
    },
    {
        title: '/rsvp commands',
        commands: [
            {
                command: 'ontime',
                description: 'RSVPs as going to the event on time',
                usage: '/rsvp ontime [event-id] (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'late',
                description: 'RSVPs as going to the event, but arriving late',
                usage: '/rsvp late [event-id] (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'not-going',
                description: 'RSVPs as not going to the event',
                usage: '/rsvp not [event-id] (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'unsure',
                description: 'RSVPs are unsure if you will be able to attend',
                usage: '/rsvp unsure [event-id] (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'remove',
                description: 'Removes your RSVP status from the event',
                usage: '/rsvp remove [event-id] (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'list',
                description: 'Lists who as RSVPed to the event',
                usage: '/rsvp list [event-id] (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'limit',
                description: 'Sets the max number of people allowed to attend. -1 to disable the limit',
                usage: '',
                access: { renderedAccessLevel: CommandAccessLevel.Privileged },
            },
            {
                command: 'role',
                description: 'Sets the role assigned when RSVPed to the event. \'@everyone\' to disable. *Note: these roles are currently not automatically removed',
                usage: '/rsvp role [event-id] [role] (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated, alternateText: 'Elevated, patron-only' },
            },
        ],
    },
    {
       title: '/announcement commands',
       commands: [
           {
               command: 'create',
               description: 'Starts the announcement create wizard',
               usage: '/announcement create (type) (modifier) (channel) (minutes) (hours) (calendar)',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'type',
               description: 'Sets the announcement type. Valid types: UNIVERSAL, SPECIFIC, COLOR, RECUR',
               usage: '/announcement type [type]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'modifier',
               description: 'Sets the announcement modifier. Valid types: BEFORE (default), DURING',
               usage: '/announcement modifier [modifier]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'event',
               description: 'Sets the announcement\'s event. Only needed when using SPECIFIC or RECUR types',
               usage: '/announcement event [event-id]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'color',
               description: 'Sets the announcement\'s color. Only needed when using COLOR type',
               usage: '/announcement color [color]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'channel',
               description: 'Sets the channel the announcement will be posted in',
               usage: '/announcement channel [channel]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'minutes',
               description: 'Sets the minutes before an event to announce. Added to hours',
               usage: '/announcement minutes [number]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'hours',
               description: 'Sets the hours before an event to announce. Added to minutes',
               usage: '/announcements hours [number]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'info',
               description: 'Sets the additional info to be posted along with the event. No text input to remove',
               usage: '/announcement info (text)',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'calendar',
               description: 'Sets the calendar the announcement will read from. Defaults to 1 (main calendar)',
               usage: '/announcement calendar [calendar]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'publish',
               description: 'Toggles if the announcement should be pushed to channel subscribers',
               usage: '/announcement public [true/false]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged, alternateText: 'Privileged, Patron-only' },
           },
           {
               command: 'review',
               description: 'Displays the announcement properties in the wizard',
               usage: '/announcement review',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'confirm',
               description: 'Commits the changes made in the wizard',
               usage: '/announcement confirm',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'cancel',
               description: 'Cancels the announcement wizard',
               usage: '/announcement cancel',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'edit',
               description: 'Starts the announcement edit wizard',
               usage: '/announcement edit [announcement-id]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'copy',
               description: 'Copies an existing announcement to a new one',
               usage: '/announcement copy [announcement-id]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'delete',
               description: 'Deletes an announcement',
               usage: '/announcement delete [announcement-id]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'enable',
               description: 'Sets whether an announcement is enabled',
               usage: '/announcement enable [announcement-id] [true/false]',
               access: { renderedAccessLevel: CommandAccessLevel.Privileged },
           },
           {
               command: 'view',
               description: 'Displays an existing announcement\'s properties',
               usage: '/announcement view [announcement-id]',
               access: { renderedAccessLevel: CommandAccessLevel.Everyone },
           },
           {
               command: 'list',
               description: 'Lists announcements, -1 for all',
               usage: '/announcement list [amount]',
               access: { renderedAccessLevel: CommandAccessLevel.Everyone },
           },
           {
               command: 'subscribe',
               description: 'Subscribes to an announcement to be pinged when it is posted',
               usage: '/announcement subscribe [announcement-id] (user/role)',
               access: { renderedAccessLevel: CommandAccessLevel.Everyone },
           },
           {
               command: 'unsubscribe',
               description: 'Unsubscribes to an announcement, to stop being pinged when it is posted',
               usage: '/announcement unsubscribe [announcement-id] (user/role)',
               access: { renderedAccessLevel: CommandAccessLevel.Everyone },
           },
       ],
    },
    {
        title: '/settings commands',
        commands: [
            {
                command: 'view',
                description: 'Displays the current settings for the guild',
                usage: '/settings view',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'role',
                description: 'Sets the role required to use privileged commands',
                usage: '/settings role [role]',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'announcement-style',
                description: 'Changes the style announcements will be posted as',
                usage: '/settings announcement-style [style]',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'pause-announcements',
                description: 'Allows pausing and unpausing of all announcements for a period of time. Leave options blank to unpause',
                usage: '/settings pause-announcements (hours) (days) (weeks)',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated }
            },
            {
                command: 'language',
                description: 'Changes the language the bot will use in responses',
                usage: '/settings language [lang]',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'time-format',
                description: 'Changes what format to display date/time when needed',
                usage: '/settings time-format [format]',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'keep-event-duration',
                description: 'Toggles whether to keep an event\'s duration when changing the start or end time (default false)',
                usage: '/settings keep-event-duration [true/false]',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated },
            },
            {
                command: 'branding',
                description: 'Toggles between using DisCal branding or the guild\'s name/image where possible',
                usage: '/settings branding [true/false]',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated, alternateText: 'Elevated, patron-only' },
            },
        ],
    },
    {
        title: 'All other commands',
        commands: [
            {
                command: 'discal',
                description: 'Displays information about the bot',
                usage: '/discal',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'linkcal',
                description: 'Provides info and a link to view the guild\'s calendar',
                usage: '/linkcal (overview) (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'time',
                description: 'Displays the current time as seen by the calendar\'s timezone',
                usage: '/time (calendar)',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
            {
                command: 'addcal (WIP)',
                description: 'Starts the process to add a pre-existing calendar',
                usage: '/addcal',
                access: { renderedAccessLevel: CommandAccessLevel.Elevated, alternateText: 'Elevated, patron-only, dev-only (work in progress)' },
            },
            {
                command: 'help',
                description: 'Links to the commands page and documentation',
                usage: '/help',
                access: { renderedAccessLevel: CommandAccessLevel.Everyone },
            },
        ],
    },
]


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

        <h6 className='text-discal-orange tracking-wide uppercase mt-2'>Privileged</h6>
        <p className='text-discal-light-grey'>
            Requires DisCal control role (default control role is @everyone)
        </p>

        <h6 className='text-discal-green tracking-wide uppercase mt-2'>Everyone</h6>
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

export default function Commands() {
    return <>
        <Head>
            <title>Commands - DisCal Bot</title>
        </Head>
        <Container>
            <h1 className='text-4xl font-semibold text-discal-blue uppercase tracking-wide text-center my-5'>
                Commands
            </h1>
            <Permissions/>

            {allCommands.map((commandTableData) => (
                <div key={commandTableData.title}>
                    <hr className='mt-10 border-discal-blue'/>

                    <Disclosure defaultOpen={true}>
                        <dt>
                            <DisclosureButton className='group flex w-full items-start justify-between'>
                                <span className='text-2xl font-semibold text-discal-blue uppercase tracking-wide text-left my-5'>
                                    {commandTableData.title}
                                </span>
                                <span className='flex items-center my-5 size-8 text-discal-blue'>
                                    <PlusIcon aria-hidden='true' className='group-data-[open]:hidden' />
                                    <MinusIcon aria-hidden='true' className='group-[&:not([data-open])]:hidden' />
                                </span>
                            </DisclosureButton>
                        </dt>
                        <DisclosurePanel as='dd'>
                            <CommandTable tableData={commandTableData}/>
                        </DisclosurePanel>
                    </Disclosure>

                </div>
            ))}
        </Container>
    </>
}
