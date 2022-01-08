import User from "./user";

export default class Session {
    private readonly _token: string | null;
    private readonly _expires: Date | null
    private readonly _user: User | null;

    constructor(token: string | null = null, expires: Date | null = null, user: User | null = null) {
        this._token = token
        this._expires = expires
        this._user = user
    }

    get token(): string | null {
        return this._token;
    }

    get expires(): Date | null {
        return this._expires;
    }

    get user(): User | null {
        return this._user;
    }
}
