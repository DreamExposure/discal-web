import {useRequestEmpty, useRequestJson, useRequestText} from "./client";
import {useCallback} from "react";
import type {LoginResponse, NetworkStatus, Session} from "./types";

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
