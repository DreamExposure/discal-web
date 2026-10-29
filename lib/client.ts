import {useCallback, useContext} from "react";
import SessionContext from "./context";
import {ApiRequestResponse} from './types'

function buildRequest(method: string, endpoint: string, token: string | null, data?: Object) {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    // TODO: Gonna need handling of the embed token???
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const body: BodyInit | null = data ? JSON.stringify(data) : null;

    return fetch(`${getBaseUrl()}${endpoint}`, {
        method: method,
        headers: headers,
        body: body
    });
}

// UseCallback/useEffects
export function useRequestJson<T>() {
    const {session} = useContext(SessionContext);
    const token = session.token

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
    const token = session.token

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
    const token = session.token

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

