import React from "react";
import {format} from 'date-fns';
import add from 'date-fns/add';

export function TimeFromDate({fetchedDate, duration}) {
    let timeCopy = new Date(fetchedDate);

    let originHourMin = format(timeCopy, 'HH:mm');
    let destinationHourMin = format(add(timeCopy, {minutes: duration}), 'HH:mm');

    return (
        <div>{originHourMin}-{destinationHourMin}</div>
    )
}