import React from "react";
import styles from "./stylesSidebar.module.css";

export const MemoizedFilter = React.memo(function Filter({ value, active, onChange, id }) {
    return(
        <div className={styles.checkbox}>
            <input type="checkbox" className={styles.customCheckbox} checked={active} data-value={value} onChange={onChange} id={id} />
            <label htmlFor={id} >{value}</label>
        </div>
    )
});
