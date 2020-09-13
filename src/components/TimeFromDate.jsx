import React from "react";

export function TimeFromDate({fetchedDate, duration}) {
    let timeCopy = new Date(fetchedDate);
    console.log("fetched: ", fetchedDate);
    console.log("copied: ", timeCopy.getHours());

    let timeOrigin = fetchedDate.split("T")[1].split(".")[0].split(":");
    let originHourMin = `${timeOrigin[0]}:${timeOrigin[1]}`;

    let timeDestination = timeCopy.getHours() * 60 + timeCopy.getMinutes() + duration;
    let destinationHour = Math.floor(timeDestination/60);
    let formatHours = destinationHour>=24 ? destinationHour-24 : destinationHour;
    let formatMins = timeDestination%60;

    let destinationHourMin = `${formatHours<10 ? "0"+formatHours : formatHours}:${formatMins<10 ? "0"+formatMins : formatMins}`;

    return(
        <div>{originHourMin}-{destinationHourMin}</div>
    )
}