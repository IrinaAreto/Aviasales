import React, {useEffect, useState} from "react";
import {Filter} from "./Filters";
import {filtersList} from "./FiltersList";
import {useDispatch} from "react-redux";
import {setTicketFilters} from "../store/Actions";
import "./stylesSidebar.css";

export function SidebarFiler() {
    const [filters, setFilters] = useState(filtersList.map((n) => ({ active: true, value: n.value, id: n.id, stops: n.stops })));
    const [isError, setIsError] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const initialFilters = filters.filter(n => n.active).map(n => n.stops);
        dispatch(setTicketFilters(initialFilters));
    }, []);

    const onFilterChange = ({ target: { checked: active, dataset: {value} } }) => {
        setIsError(false);
        try{
        const newFilters = filters.map(n => [n.value, 'Все'].includes(value) ? { ...n, active } : n),
            isAll = newFilters.filter( n => n.value !== 'Все' ).every( n => n.active );

        newFilters.find( n => n.value === 'Все' ).active = isAll;

        setFilters(newFilters);

        const filteredItems = newFilters.filter(n => n.active).map(n => n.stops);
        dispatch(setTicketFilters(filteredItems));
        } catch (error) {
            setIsError(true);
        }
    };

    return (
        <div className="sidebar">
            <form>
                <div className="sidebar-name">количество пересадок</div>
                <React.Fragment>
                    {filters.map((item) => {
                        return (
                        <Filter key={item.id} {...item} onChange={isError ? null : onFilterChange}  />
                        )
                    })}
                </React.Fragment>
            </form>
        </div>
    )
}