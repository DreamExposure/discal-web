import {useCallback, useContext} from "react";
import SessionContext from "./context";
import type {HeadersInit} from "next/dist/server/web/spec-compliant/headers";

export function useRequestJson() {
    const {session} = useContext(SessionContext);
    const token = session.token

    return useCallback(async (method: string, url: string, data?: Object) => {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const body: BodyInit | null = data ? JSON.stringify(data) : null;

        const response = await fetch(url, {
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

    return useCallback(async (method: string, url: string, data?: Object) => {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const body: BodyInit | null = data ? JSON.stringify(data) : null;

        const response = await fetch(url, {
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

    return useCallback(async (method: string, url: string, data?: Object) => {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const body: BodyInit | null = data ? JSON.stringify(data) : null;

        return await fetch(url, {
            method: method,
            headers: headers,
            body: body
        })
    }, [token])
}


