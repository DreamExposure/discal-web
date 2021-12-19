export type Props = {
    children?: JSX.Element | JSX.Element[] | string
    extraClass?: string
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
