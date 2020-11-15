import React, {useEffect} from "react";
import {iataPics} from "./Url";
import {TicketDetails} from "./TicketDetails";
import {getSearchId, itemsHasSorted} from "../store/Actions";
import "./stylesMainPart.css";
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
        let firstTab = document.getElementsByClassName('first');
        let secondTab = document.getElementsByClassName('second');

        if(name === 'first'){
            firstTab[0].classList.add('active');
            secondTab[0].classList.remove('active');

        } else if(name === 'second') {
            secondTab[0].classList.add('active');
            firstTab[0].classList.remove('active');
        }

        sortTickets(type);
    }

    const checkedFilters = useSelector((state) => state.filters);
    const filteredTickets = checkedFilters.includes("all") ? ticketsArray.slice() : ticketsArray.slice().filter(n => (checkedFilters.includes(n.segments[0].stops.length) || checkedFilters.includes(n.segments[1].stops.length)));

    const isError = useSelector((state) => state.err);
    const isLoading = useSelector((state) => state.loading);

    if(isError) return <div className="main-part">Ошибка!</div>;
    else
    return(
        <div className="main-part">
            <div className="tabs"><button className='first active' onClick={()=>{setActiveTab('first', "cheaper")}}>самый дешевый</button><button className='second ' onClick={()=>{setActiveTab('second', "fastest")}}>самый быстрый</button></div>
            {isLoading ? (<div className='loading'>
                Загрузка...
                <div className="loading-circle"/>
            </div>) : (
                filteredTickets.slice(0, 5).map((item) => {
                    return (
                        <div className="ticket" key={item.price+item.carrier+item.segments[0].duration}>
                            <div className="ticket-name">
                                <div>{item.price} P</div>
                                <div><img src={iataPics + item.carrier + '.png'} alt="iata symbol"/></div>
                            </div>
                            <div className="ticket-details">
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