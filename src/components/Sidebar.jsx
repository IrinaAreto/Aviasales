import React, {useCallback} from "react";
import {MemoizedFilter} from "./Filters";
import {useDispatch, useSelector} from "react-redux";
import {onFilterChange} from "../store/Actions";
import styles from "./stylesSidebar.module.css";

export function SidebarFiler() {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters);
    const isError = useSelector((state) => state.err);

    const setFilters = useCallback(({target: {checked: active, dataset: {value}}}) => {
        dispatch(onFilterChange({filters, active, value}))
    }, [filters]);

    return (
        <div className={styles.sidebar}>
            <form>
                <div className={styles.sidebarName}>количество пересадок</div>
                <>
                    {filters.map((item) => {
                        return (
                            <MemoizedFilter key={item.id} {...item}
                                            onChange={isError ? null : setFilters}/>
                        )
                    })}
                </>
            </form>
        </div>
    )
}