import React, {useMemo} from "react";
import {TimeFromDate} from "./TimeFromDate";
import {StopsCount} from "./StopsCount";

export function TicketDetails({segment}) {
    const durationHours = useMemo(() => segment.duration>=60 ? Math.floor(segment.duration/60) : "00", [segment.duration]);

    return(
        <>
            <div><div>{segment.origin} - {segment.destination}</div><TimeFromDate fetchedDate={segment.date} duration={segment.duration}/></div>
            <div><div>в пути</div><div>{durationHours}ч {segment.duration % 60}м</div></div>
            <StopsCount stops={segment.stops}/>
        </>
    )
}