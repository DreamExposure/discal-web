import 'server-only'
import {TemporaryTokenResponse} from "../types";

export async function getJsonServerSide(method: string, endpoint: string ,data?: Object) {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authorization": `INT ${process.env.DISCAL_API_KEY}`
    };

    const body: BodyInit | null = data ? JSON.stringify(data) : null;

    const response = await fetch(`${getBaseUrl()}${endpoint}`, {
        method: method,
        headers: headers,
        body: body
    });

    return response.json
}

export async function getTemporaryEmbedToken(guildId: string): Promise<() => Promise<TemporaryTokenResponse>> {
    return await getJsonServerSide('GET', `/cam/v1/token/calendar-embed&guildId=${guildId}`)
}

function getBaseUrl(): string {
    return `${process.env.DISCAL_BASE_URL}/api`
}
