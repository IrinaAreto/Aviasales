import React from "react";
import styles from "./stylesMainPart.module.css";

export function StopsCount({stops}) {
    let stopsTitle = "";
    if (stops.length === 0) {
        stopsTitle = "пересадок";
    } else if (stops.length === 1) {
        stopsTitle = "пересадка";
    } else {
        stopsTitle = "пересадки";
    }

    return (
        <div>
            <div>{stops.length > 0 ? stops.length : "без"} {stopsTitle}</div>
            <div className={styles.ticketChange}>{stops.join(", ")}</div>
        </div>
    )
}