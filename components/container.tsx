export default function Container(children: JSX.Element[]) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-10">
            {children}
        </div>
    </div>
}
