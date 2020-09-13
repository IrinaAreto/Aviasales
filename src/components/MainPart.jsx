import React, {useEffect, useState} from "react";
import {gettingTickets, iataPics, initialUrl} from "./Url";
import {TimeFromDate} from "./TimeFromDate";
import {StopsCount} from "./StopsCount";
import "./stylesMainPart.css";

export function MainPart() {
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getSearchId();
    }, []);

    const getSearchId = async () => {
        setIsError(false);
        try {
            let response = await fetch(initialUrl);
            const result = await response.json();
            console.log('success: ', result.searchId);
            getTickets(result.searchId);
        } catch (error) {
            setIsError(true);
            console.log("error: ", error);
        }
    }

    const getTickets = async (searchId) => {
        setIsError(false);
        setIsLoading(true);
        try {
            let response = await fetch(gettingTickets + `?searchId=${searchId}`);

            let newData = [];
            let result = "";
            if(response.status === 500) {
                newData = data.slice();
            } else if (response.status === 200) {
                result = await response.json();
                newData = data.slice().concat(result.tickets);
            }

            setData(newData);

            if(!result.stop || response.status === 500) {
                getTickets(searchId);
            }

        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    }

    const setActiveTab = (name) => {
        let firstTab = document.getElementsByClassName('first');
        let secondTab = document.getElementsByClassName('second');

        if(name === 'first'){
            firstTab[0].classList.add('active');
            secondTab[0].classList.remove('active');

        } else if(name === 'second') {
            secondTab[0].classList.add('active');
            firstTab[0].classList.remove('active');
        }
    }

    if(isError) return <div>Ошибка!</div>;
    else
    return(
        <div className="main-part">
            <div className="tabs"><button className='first active' onClick={()=>{setActiveTab('first')}}>самый дешевый</button><button className='second ' onClick={()=>{setActiveTab('second')}}>самый быстрый</button></div>
            {isLoading ? (<div>
                Загрузка...
            </div>) : (
                data.map((item) => {
                    return (
                        <div className="ticket">
                            <div className="ticket-name">
                                <div>{item.price} P</div>
                                <div><img src={iataPics + item.carrier + '.png'} alt="iata symbol"/></div>
                            </div>
                            <div className="ticket-details">
                                <div><div>{item.segments[0].origin} - {item.segments[0].destination}</div><TimeFromDate fetchedDate={item.segments[0].date} duration={item.segments[0].duration}/></div>
                                <div><div>в пути</div><div>{item.segments[0].duration>=60 ? Math.floor(item.segments[0].duration/60) : "00"}ч {item.segments[0].duration % 60}м</div></div>
                                <StopsCount stops={item.segments[0].stops}/>
                                <div><div>{item.segments[1].origin} - {item.segments[1].destination}</div><TimeFromDate fetchedDate={item.segments[1].date} duration={item.segments[1].duration}/></div>
                                <div><div>в пути</div><div>{item.segments[1].duration>=60 ? Math.floor(item.segments[1].duration/60) : "00"}ч {item.segments[1].duration % 60}м</div></div>
                                <StopsCount stops={item.segments[1].stops}/>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}