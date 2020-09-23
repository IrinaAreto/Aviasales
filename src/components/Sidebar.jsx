import React, {useEffect, useState} from "react";
import {Filter} from "./Filters";
import {filtersList} from "./FiltersList";
import {useDispatch} from "react-redux";
import {setTicketFilters} from "../store/Actions";
import "./stylesSidebar.css";

export function SidebarFiler() {
    const [filters, setFilters] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setFilters(filtersList.map((n) => ({ active: true, value: n.value, id: n.id, stops: n.stops })));
    }, [ filtersList ]);

    const onFilterChange = ({ target: { checked: active, dataset: {value} } }) => {
        const newFilters = filters.map(n => [n.value, 'Все'].includes(value) ? { ...n, active } : n),
            isAll = newFilters.filter( n => n.value !== 'Все' ).every( n => n.active );

        newFilters.find( n => n.value === 'Все' ).active = isAll;

        setFilters(newFilters);

        const filteredItems = newFilters.filter(n => n.active).map(n => n.stops);
        dispatch(setTicketFilters(filteredItems));
    };

    return (
        <div className="sidebar">
            <form>
                <div className="sidebar-name">количество пересадок</div>
                <React.Fragment>
                    {filters.map((item) => {
                        return (
                        <Filter key={item.id} {...item} onChange={onFilterChange}  />
                        )
                    })}
                </React.Fragment>
            </form>
        </div>
    )
}