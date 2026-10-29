import 'server-only'
import {ApiRequestResponse, TemporaryTokenResponse} from "../types";

function buildRequest(method: string, endpoint: string, data?: Object) {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authorization": `INT ${process.env.DISCAL_API_KEY}`
    };

    const body: BodyInit | null = data ? JSON.stringify(data) : null;

    return fetch(`${getBaseUrl()}${endpoint}`, {
        method: method,
        headers: headers,
        body: body
    });
}

export async function getJsonServerSide<T>(method: string, endpoint: string ,data?: Object) {
    const webResponse = await buildRequest(method, endpoint, data)


    let response =  {
        success: webResponse.ok,
        code: webResponse.status,
    } as ApiRequestResponse<T>

    if (webResponse.ok) response.data = await webResponse.json()
    else response.error = await webResponse.json()

    return response
}

export async function getTemporaryEmbedToken(guildId: string): Promise<ApiRequestResponse<TemporaryTokenResponse>> {
    return await getJsonServerSide('GET', `/cam/v1/token/calendar-embed&guildId=${guildId}`)
}

function getBaseUrl(): string {
    return `${process.env.DISCAL_BASE_URL}/api`
}
