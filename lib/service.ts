import {requestJson, useRequestEmpty, useRequestJson, useRequestText} from "./client";
import {useCallback} from "react";
import type {CalendarV3Model, LoginResponse, NetworkStatus, Session} from "./types";

/////////* login requests */////////
export function useRequestLogin() {
    const requestJson = useRequestJson();

    return useCallback(async (): Promise<LoginResponse> => {
        return await requestJson('GET', '/cam/oauth2/discord/login')
    }, [requestJson])
}

export function useRequestLogout() {
    const requestEmpty = useRequestEmpty();

    return useCallback(async (): Promise<Response> => {
        return await requestEmpty('GET', '/cam/oauth2/discord/logout')
    }, [requestEmpty])

}

/////////* oauth callback requests */////////
export function useRequestDiscordCode() {
    const requestJson = useRequestJson();

    return useCallback(async (code: string, state: string): Promise<Session> => {
        return await requestJson('POST', '/cam/oauth2/discord/code', {code, state})
    }, [requestJson])
}

/////////* link requests */////////
export function useRequestInviteLink() {
    const requestText = useRequestText()

    return useCallback(async (): Promise<string> => {
        return await requestText('GET', '/v3/invite')
    }, [requestText])
}

/////////* Status requests */////////
export function useRequestStatus() {
    const requestJson = useRequestJson();

    return useCallback(async (): Promise<NetworkStatus> => {
        return await requestJson('GET', '/v3/status');
    }, [requestJson])
}

/////////* Calendar requests */////////
export async function requestCalendar(guildId: string, calendarNumber: number): Promise<() => Promise<CalendarV3Model>> {
    return await requestJson('GET', `/v3/guilds/${guildId}/calendars/${calendarNumber}`)
}

export function useRequestCalendar() {
    const requestJson = useRequestJson()

    return useCallback(async (guildId: string, calendarNumber: number): Promise<CalendarV3Model> => {
        return await requestJson('GET', `/v3/guilds/${guildId}/calendars/${calendarNumber}`)
    }, [requestJson])
}

/////////* Event requests */////////
export function useRequestEvent() {
    const requestJson = useRequestJson()

    return useCallback(async (guildId: string, calendarNumber: number, eventId: string): Promise<Event> => {
        return await requestJson('GET', `/v3/guilds/${guildId}/calendars/${calendarNumber}/events/${eventId}`)
    }, [requestJson])
}

export function useRequestEventsRange() {
    const requestJson = useRequestJson()

    return useCallback(async (guildId: string, calendarNumber: number, start: Date, end: Date): Promise<Event[]> => {
        return await requestJson('GET', `/v3/guilds/${guildId}/calendars/${calendarNumber}/events?start=${start.toISOString()}&end=${end.toISOString()}`)
    }, [requestJson])
}
