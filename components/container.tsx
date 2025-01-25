import {ReactNode} from "react";

export default function Container(props: {children?: ReactNode}) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {props.children}
    </div>
}
