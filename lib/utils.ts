import {Event, EventColor, EventRecurrence} from './types'
import {EventInput} from "@fullcalendar/react";

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function saveToLocalStorage(key: string, item: Object) {
    if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(item))
}

export function loadFromLocalStorage(key: string, defaultValue: Object | null = ""): Object {
    if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(key)
        if (raw != null) return JSON.parse(raw)
        else return defaultValue || ""
    } else return ""
}

export function removeFromLocalStorage(key: string) {
    if (typeof window !== 'undefined') localStorage.removeItem(key)
}

export function discalEventToFullCalendarEvent(discalEvent: Event, editable: boolean) {
    let event: EventInput = {
        id: discalEvent.id,
        groupId: discalEvent.id.split("_")[0],
        title: discalEvent.name,
        description: discalEvent.description,
        location: discalEvent.location,
        image: discalEvent.image,
        eventColor: discalEvent.color,

        start: discalEvent.start,
        end: discalEvent.end,

        overlap: true,
        editable: editable,

        rawEvent: discalEvent,
    };

    if (discalEvent.color != EventColor.NONE) {
        event.borderColor = eventColorRGB(discalEvent.color);
    }
    if (discalEvent.recur) {
        event.rrule = discalEvent.rrule;
    }

    return event;
}

export function eventColorRGB(color: EventColor) {
    switch (color) {
        case EventColor.MELROSE: {
            return '#A4BDFC';
        }
        case EventColor.RIPTIDE: {
            return '#7AE7BF';
        }
        case EventColor.MAUVE: {
            return '#DBADFF';
        }
        case EventColor.TANGERINE: {
            return '#FF887C';
        }
        case EventColor.DANDELION: {
            return '#FBD75B';
        }
        case EventColor.MAC_AND_CHEESE: {
            return '#FFB878';
        }
        case EventColor.TURQUOISE: {
            return '#46D6DB';
        }
        case EventColor.MERCURY: {
            return '#E1E1E1';
        }
        case EventColor.BLUE: {
            return '#5484ED';
        }
        case EventColor.GREEN: {
            return '#51B749';
        }
        case EventColor.RED: {
            return '#DC2127';
        }
    }
}

export function recurrenceAsHumanReadable(recurrence: EventRecurrence) {
    let text = `Repeat ${recurrence.frequency.toString().toLowerCase()} every ${recurrence.interval} `;

    // I really shouldn't have to convert it to a string, but it doesn't work otherwise
    switch (recurrence.frequency.toString()) {
        case "DAILY": {
            text += 'days(s) '
            break
        }
        case "WEEKLY": {
            text += 'week(s) '
            break
        }
        case "MONTHLY": {
            text += 'month(s) '
            break
        }
        case "YEARLY": {
            text += 'year(s) '
            break
        }
    }

    if (recurrence.byMonth !== null && recurrence.byMonthDay !== null)  text += `on ${recurrence.byMonth} ${recurrence.byMonthDay} `
    else if (recurrence.byMonthDay !== null) text += `on the ${recurrence.byMonthDay} `

    if (recurrence.byMonth !== null && recurrence.bySetPos !== null && recurrence.byDay.length > 0) text += `on the ${recurrence.bySetPos} ${recurrence.byDay.join(',')} of ${recurrence.byMonth} `
    else if (recurrence.bySetPos !== null && recurrence.byDay.length > 0) text += `on the ${recurrence.bySetPos} ${recurrence.byDay.join(',')} `
    else if (recurrence.byDay.length > 0) text += `on ${recurrence.byDay.join(',')} `

    if (recurrence.count != null) text += `End after ${recurrence.count} occurrence(s)`

    return text
}
