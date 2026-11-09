import {useCallback, useContext} from "react";
import SessionContext from "./context";
import {ApiRequestResponse, SessionContextData} from './types'
import {loadFromLocalStorage} from "./utils";

function buildRequest(method: string, endpoint: string, token: string | null | undefined, data?: Object) {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = token;
    }

    const body: BodyInit | null = data ? JSON.stringify(data) : null;

    return fetch(`${getBaseUrl()}${endpoint}`, {
        method: method,
        headers: headers,
        body: body
    });
}

// just async, one day maybe this will fully replace the use effects, but webdev is not my forte
export async function requestJson<T>(method: string, endpoint: string, data?: Object) {
    // Load session from local storage instead of context... I dunno how well this will work, but maybe for some stuff?
    const session = loadFromLocalStorage("session", {}) as SessionContextData
    const token = getComputedAuthToken(session)

    const webResponse = await buildRequest(method, endpoint, token, data)

    let response =  {
        success: webResponse.ok,
        code: webResponse.status,
    } as ApiRequestResponse<T>

    if (webResponse.ok) response.data = await webResponse.json()
    else response.error = await webResponse.json()

    return response
}

// UseCallback/useEffects
export function useRequestJson<T>() {
    const {session} = useContext(SessionContext);
    const token = getComputedAuthToken(session)

    return useCallback(async (method: string, endpoint: string, data?: Object) => {
        const webResponse = await buildRequest(method, endpoint, token, data)

        let response =  {
            success: webResponse.ok,
            code: webResponse.status,
        } as ApiRequestResponse<T>

        if (webResponse.ok) response.data = await webResponse.json()
        else response.error = await webResponse.json()

        return response
    }, [token])
}

export function useRequestText() {
    const {session} = useContext(SessionContext);
    const token = getComputedAuthToken(session)

    return useCallback(async (method: string, endpoint: string, data?: Object) => {
        const webResponse = await buildRequest(method, endpoint, token, data)

        let response =  {
            success: webResponse.ok,
            code: webResponse.status,
        } as ApiRequestResponse<string>

        if (webResponse.ok) response.data = await webResponse.text()
        else response.error = await webResponse.json()

        return response
    }, [token])
}

export function useRequestEmpty() {
    const {session} = useContext(SessionContext);
    const token = getComputedAuthToken(session)

    return useCallback(async (method: string, endpoint: string, data?: Object) => {
        const webResponse = await buildRequest(method, endpoint, token, data)

        let response =  {
            success: webResponse.ok,
            code: webResponse.status,
            data: null
        } as ApiRequestResponse<null>

        if (!webResponse.ok) response.error = await webResponse.json()

        return response
    }, [token])
}

function getBaseUrl(): string {
    return '/api'
}

function getTokenType(session: SessionContextData): string | undefined {
    if (session.session) return "Bearer "
    else if (session.tempToken) return "Temp "
    else return undefined
}

function getToken(session: SessionContextData): string | undefined {
    return session.session?.token ?? session.tempToken?.token
}

function getComputedAuthToken(session: SessionContextData): string | undefined {
    const tokenType = getTokenType(session)
    if (tokenType) return tokenType + getToken(session)
    else return undefined
}

