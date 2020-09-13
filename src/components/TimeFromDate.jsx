import React from "react";

export function TimeFromDate({fetchedDate, duration}) {
    let timeCopy = new Date(fetchedDate);

    let originHours = timeCopy.getHours();
    let originMins = timeCopy.getMinutes();
    let originHourMin = `${originHours<10 ? "0"+originHours : originHours}:${originMins<10 ? "0"+originMins : originMins}`;

    let timeDestination = originHours * 60 + originMins + duration;
    let destinationHour = Math.floor(timeDestination/60);
    let formatHours = destinationHour>=24 ? destinationHour-24 : destinationHour;
    let formatMins = timeDestination%60;

    let destinationHourMin = `${formatHours<10 ? "0"+formatHours : formatHours}:${formatMins<10 ? "0"+formatMins : formatMins}`;

    return(
        <div>{originHourMin}-{destinationHourMin}</div>
    )
}