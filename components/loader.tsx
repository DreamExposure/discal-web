import React, { JSX } from "react";
import {CogIcon} from "@heroicons/react/24/outline";

export default function Loader(): JSX.Element {
    return <React.Fragment>
        <h1 className="text-discal-blue text-5xl uppercase tracking-wide">
            <CogIcon className="animate-spin-slow h-12 w-12 mr-5 float-left"/>
            Working...
        </h1>
    </React.Fragment>
}
