export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function saveToLocalStorage(key: string, item: Object) {
    if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(item))
}

export function loadFromLocalStorage(key: string, defaultValue: Object | null = ""): Object {
    if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(key)
        if (raw != null) return JSON.parse(raw)
        else return defaultValue || ""
    } else return ""
}

export function removeFromLocalStorage(key: string) {
    if (typeof window !== 'undefined') localStorage.removeItem(key)
}
