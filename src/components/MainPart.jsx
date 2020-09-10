import React from "react";
import "./stylesMainPart.css";

export function MainPart() {
    const setActiveTab = (name) => {
        let firstTab = document.getElementsByClassName('first');
        let secondTab = document.getElementsByClassName('second');

        if(name === 'first'){
            firstTab[0].classList.add('active');
            secondTab[0].classList.remove('active');

        } else if(name === 'second') {
            secondTab[0].classList.add('active');
            firstTab[0].classList.remove('active');
        } else {
            return;
        }
    }

    return(
        <div className="main-part">
            <div className="tabs"><button className='first active' onClick={()=>{setActiveTab('first')}}>самый дешевый</button><button className='second ' onClick={()=>{setActiveTab('second')}}>самый быстрый</button></div>
            <div className="ticket">
                <div className="ticket-name">
                    <div>13 400 P</div>
                    <div>Airlines</div>
                </div>
                <div className="ticket-details">
                    <div><div>mow-hkt</div><div>10:45-08:00</div></div>
                    <div><div>в пути</div><div>21ч 15м</div></div>
                    <div><div>2 пересадки</div><div className="ticket-change">hkg,jnb</div></div>
                    <div><div>mow-hkt</div><div>11:20-00:50</div></div>
                    <div><div>в пути</div><div>13ч 15м</div></div>
                    <div><div>1 пересадка</div><div className="ticket-change">hkg</div></div>
                </div>
            </div>
        </div>
    )
}