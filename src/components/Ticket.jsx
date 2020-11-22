import React from "react";
import styles from "./stylesMainPart.module.css";
import {iataPics} from "./Url";
import {TicketDetails} from "./TicketDetails";

export const MemoizedTicket = React.memo(function Ticket({item}) {
    return (
        <div className={styles.ticket}>
            <div className={styles.ticketName}>
                <div>{item.price} P</div>
                <div><img src={iataPics + item.carrier + '.png'} alt="iata symbol"/></div>
            </div>
            <div className={styles.ticketDetails}>
                <TicketDetails segment={item.segments[0]}/>
                <TicketDetails segment={item.segments[1]}/>
            </div>
        </div>
    )
})