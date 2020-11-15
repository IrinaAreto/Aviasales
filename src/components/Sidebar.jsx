import React, {useEffect, useState, useCallback} from "react";
import {MemoizedFilter} from "./Filters";
import {filtersList} from "./FiltersList";
import {useDispatch} from "react-redux";
import {filtersHasSet} from "../store/Actions";
import "./stylesSidebar.css";

export function SidebarFiler() {
    const [filters, setFilters] = useState(filtersList.map((n) => ({ active: true, value: n.value, id: n.id, stops: n.stops })));
    const [isError, setIsError] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const initialFilters = filters.filter(n => n.active).map(n => n.stops);
        dispatch(filtersHasSet(initialFilters));
    }, []);

    const onFilterChange = useCallback(({ target: { checked: active, dataset: {value} } }) => {
        setIsError(false);
        try{
        const newFilters = filters.map(n => [n.value, 'Все'].includes(value) ? { ...n, active } : n),
            isAll = newFilters.filter( n => n.value !== 'Все' ).every( n => n.active );

        newFilters.find( n => n.value === 'Все' ).active = isAll;

        setFilters(newFilters);

        const filteredItems = newFilters.filter(n => n.active).map(n => n.stops);
        dispatch(filtersHasSet(filteredItems));
        } catch (error) {
            setIsError(true);
        }
    }, [filters]);

    return (
        <div className="sidebar">
            <form>
                <div className="sidebar-name">количество пересадок</div>
                <>
                    {filters.map((item) => {
                        return (
                        <MemoizedFilter key={item.id} {...item} onChange={isError ? null : onFilterChange}  />
                        )
                    })}
                </>
            </form>
        </div>
    )
}