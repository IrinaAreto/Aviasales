import React, {useEffect} from "react";
import {iataPics} from "./Url";
import {TicketDetails} from "./TicketDetails";
import {getSearchId, itemsHasSorted} from "../store/Actions";
import styles from "./stylesMainPart.module.css";
import {useDispatch, useSelector} from "react-redux";

export function MainPart() {
    const dispatch = useDispatch();
    const ticketsArray = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(getSearchId());
    }, []);

    const sortTickets = (sortType) => {
        let ticketsArr = ticketsArray.slice();

        if(sortType === "cheaper") {
            ticketsArr = ticketsArr.sort((a, b) => a.price > b.price ? 1 : -1);
        } else if(sortType === "fastest") {
            ticketsArr = ticketsArr.sort((a, b) => a.segments[0].duration+a.segments[1].duration > b.segments[0].duration+b.segments[1].duration ? 1 : -1);
        }
        dispatch(itemsHasSorted(ticketsArr));
    }

    const setActiveTab = (name, type) => {
        let firstTab = document.getElementsByClassName(`${styles.first}`);
        let secondTab = document.getElementsByClassName(`${styles.second}`);

        if(name === `${styles.first}`){
            firstTab[0].classList.add(`${styles.active}`);
            secondTab[0].classList.remove(`${styles.active}`);

        } else if(name === `${styles.second}`) {
            secondTab[0].classList.add(`${styles.active}`);
            firstTab[0].classList.remove(`${styles.active}`);
        }

        sortTickets(type);
    }

    const checkedFilters = useSelector((state) => state.filters);
    const filteredTickets = checkedFilters.includes("all") ? ticketsArray.slice() : ticketsArray.slice().filter(n => (checkedFilters.includes(n.segments[0].stops.length) || checkedFilters.includes(n.segments[1].stops.length)));

    const isError = useSelector((state) => state.err);
    const isLoading = useSelector((state) => state.loading);

    if(isError) return <div className={styles.mainPart}>Ошибка!</div>;
    else
    return(
        <div className={styles.mainPart}>
            <div className={styles.tabs}><button className={`${styles.first} ${styles.active}`} onClick={()=>{setActiveTab(`${styles.first}`, "cheaper")}}>самый дешевый</button><button className={`${styles.second} `} onClick={()=>{setActiveTab(`${styles.second}`, "fastest")}}>самый быстрый</button></div>
            {isLoading ? (<div className={styles.loading}>
                Загрузка...
                <div className={styles.loadingCircle}/>
            </div>) : (
                filteredTickets.slice(0, 5).map((item) => {
                    return (
                        <div className={styles.ticket} key={item.price+item.carrier+item.segments[0].duration}>
                            <div className={styles.ticketName}>
                                <div>{item.price} P</div>
                                <div><img src={iataPics + item.carrier + '.png'} alt="iata symbol"/></div>
                            </div>
                            <div className={styles.ticketDetails}>
                                <TicketDetails segment={item.segments[0]} />
                                <TicketDetails segment={item.segments[1]} />
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}