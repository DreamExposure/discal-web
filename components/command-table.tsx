import { CommandAccessLevel, CommandData, CommandTableData} from "../lib/types";
import React, {JSX} from "react";
import {classNames} from "../lib/utils";

function CommandTableRow(props: {data: CommandData}): JSX.Element {
    let ral = props.data.access.renderedAccessLevel

    return <tr className='bg-light-grey border-l border-r border-b border-discal-light-grey' role='rowgroup'>
        <td className='p-3 block md:table-cell text-left md:text-center text-discord-blurple'>{props.data.command}</td>
        <td className='p-3 block md:table-cell text-left text-white'>{props.data.description}</td>
        <td className='p-3 block md:table-cell text-left text-discord-greyple opacity-75'>{props.data.usage}</td>
        <td className={classNames('p-3 block md:table-cell text-left',
            // I know this is ugly, but I dunno how else to do this rn
            ral == CommandAccessLevel.Elevated ? "text-discal-red" :
                ral == CommandAccessLevel.Privileged ? "text-discal-orange" :
                    ral == CommandAccessLevel.Everyone ? "text-discal-green" :
                        ral == CommandAccessLevel.PatronOnly ? "text-discal-red" :
                            ral == CommandAccessLevel.DevOnly ? "text-discal-red" : "text-discal-red"
        )}>
            {props.data.access.alternateText ?? props.data.access.renderedAccessLevel}
        </td>
    </tr>
}

export default function CommandTable(props: {tableData: CommandTableData}): JSX.Element {
    return <table className='min-w-full' aria-label={props.tableData.title + ' table'}>
        <caption className='hidden'>{props.tableData.title}</caption>
        <thead>
        <tr className='bg-discal-light-grey text-discal-not-black border-l border-r border-b border-discal-light-grey'
            role='rowgroup'>
            <th className='w-full md:w-1/6 py-2 text-center block md:table-cell' role='columnheader'>Command</th>
            <th className='w-2/6 py-2 text-left hidden md:table-cell' role='columnheader'>Description</th>
            <th className='w-2/6 py-2 text-left hidden md:table-cell' role='columnheader'>Usage</th>
            <th className='w-1/6 py-2 text-left hidden md:table-cell' role='columnheader'>Access</th>
        </tr>
        </thead>
        <tbody>
        {props.tableData.commands.map((commandData) => (
            <CommandTableRow key={commandData.command} data={commandData}/>
        ))}
        </tbody>
    </table>
}