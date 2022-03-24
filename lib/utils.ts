export type Props = {
    children?: JSX.Element | JSX.Element[] | string
    extraClass?: string
    caption?: string
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export class StorageUtil {

    static save(key: string, item: Object) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(item))
        }
    }

    static load(key: string, defaultValue: Object | null = ""): Object {
        if (typeof window !== 'undefined') {
            const raw = localStorage.getItem(key)
            if (raw != null) return JSON.parse(raw)
            else return defaultValue || ""
        } else return ""
    }

    static remove(key: string) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key)
        }
    }
}

export class Const {

    static get API_URL() {
        if (typeof window !== 'undefined') {
            switch (window.location.hostname) {
                case 'dev.discalbot.com':
                    return 'https://dev-api.discalbot.com'
                case 'discalbot.com':
                case 'www.discalbot.com':
                    return 'https://api.discalbot.com'
                case 'localhost':
                    return '/api/'
                default:
                    return 'invalid-hostname'
            }
        } else return 'no-hostname-found'
    }

    static get CAM_URL() {
        return this.API_URL + '/cam'
    }
}
