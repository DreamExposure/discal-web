import {useCallback, useContext} from "react";
import SessionContext from "./context";

export function useRequestJson() {
    const {session} = useContext(SessionContext);
    const token = session.token

    return useCallback(async (method: string, endpoint: string, data?: Object) => {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const body: BodyInit | null = data ? JSON.stringify(data) : null;

        const response = await fetch(`${getBaseUrl()}${endpoint}`, {
            method: method,
            headers: headers,
            body: body
        });

        return response.json()
    }, [token])
}

export function useRequestText() {
    const {session} = useContext(SessionContext);
    const token = session.token

    return useCallback(async (method: string, endpoint: string, data?: Object) => {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const body: BodyInit | null = data ? JSON.stringify(data) : null;

        const response = await fetch(`${getBaseUrl()}${endpoint}`, {
            method: method,
            headers: headers,
            body: body
        });

        return response.text()
    }, [token])
}

export function useRequestEmpty() {
    const {session} = useContext(SessionContext);
    const token = session.token

    return useCallback(async (method: string, endpoint: string, data?: Object) => {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const body: BodyInit | null = data ? JSON.stringify(data) : null;

        return await fetch(`${getBaseUrl()}${endpoint}`, {
            method: method,
            headers: headers,
            body: body
        })
    }, [token])
}

function getBaseUrl(): string {
    if (typeof window !== 'undefined') {
        switch (window.location.hostname) {
            case 'dev.discalbot.com':
            case 'discalbot.com':
            case 'www.discalbot.com':
            case 'localhost':
                return '/api'
            default:
                return 'invalid-hostname'
        }
    } else return 'no-hostname-found'
}

