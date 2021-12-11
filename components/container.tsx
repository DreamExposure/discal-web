type Props = {
    children: JSX.Element | JSX.Element[]
}

export default function Container(props: Props) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-10">
            {props.children}
        </div>
    </div>
}
