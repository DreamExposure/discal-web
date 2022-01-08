import { Props } from "../lib/utils";

export default function Container(props: Props) {
    return <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto pt-10">
            {props.children}
        </div>
    </div>
}
