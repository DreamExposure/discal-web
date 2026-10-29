import {useRequestEmpty, useRequestJson, useRequestText} from "./client";
import {useCallback} from "react";
import type {ApiRequestResponse, CalendarV3Model, LoginResponse, NetworkStatus, Session} from "./types";

/////////* login requests */////////
export function useRequestLogin() {
    const requestJson = useRequestJson<LoginResponse>();

    return useCallback(async ()  => {
        return await requestJson('GET', '/cam/oauth2/discord/login')
    }, [requestJson])
}

export function useRequestLogout() {
    const requestEmpty = useRequestEmpty();

    return useCallback(async () => {
        return await requestEmpty('GET', '/cam/oauth2/discord/logout')
    }, [requestEmpty])

}

/////////* oauth callback requests */////////
export function useRequestDiscordCode() {
    const requestJson = useRequestJson<Session>();

    return useCallback(async (code: string, state: string) => {
        return await requestJson('POST', '/cam/oauth2/discord/code', {code, state})
    }, [requestJson])
}

/////////* link requests */////////
export function useRequestInviteLink() {
    const requestText = useRequestText()

    return useCallback(async () => {
        return await requestText('GET', '/v3/invite')
    }, [requestText])
}

/////////* Status requests */////////
export function useRequestStatus() {
    const requestJson = useRequestJson<NetworkStatus>();

    return useCallback(async ()=> {
        return await requestJson('GET', '/v3/status');
    }, [requestJson])
}

/////////* Calendar requests */////////
export function useRequestCalendar() {
    const requestJson = useRequestJson<CalendarV3Model>()

    return useCallback(async (guildId: string, calendarNumber: number) => {
        return await requestJson('GET', `/v3/guilds/${guildId}/calendars/${calendarNumber}`)
    }, [requestJson])
}

/////////* Event requests */////////
export function useRequestEvent() {
    const requestJson = useRequestJson<Event>()

    return useCallback(async (guildId: string, calendarNumber: number, eventId: string) => {
        return await requestJson('GET', `/v3/guilds/${guildId}/calendars/${calendarNumber}/events/${eventId}`)
    }, [requestJson])
}

export function useRequestEventsRange() {
    const requestJson = useRequestJson<Event[]>()

    return useCallback(async (guildId: string, calendarNumber: number, start: Date, end: Date) => {
        return await requestJson('GET', `/v3/guilds/${guildId}/calendars/${calendarNumber}/events?start=${start.toISOString()}&end=${end.toISOString()}`)
    }, [requestJson])
}
