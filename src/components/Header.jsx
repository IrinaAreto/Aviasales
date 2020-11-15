import React from "react";
import styles from "./stylesHeader.module.css";

export function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.headerLogo}><img src="/img/Logo.png" alt="logo" /></div>
        </div>
    )
}