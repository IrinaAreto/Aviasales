import React from "react";
import "./stylesSidebar.css";

export function SidebarFiler() {
    return (
        <div className="sidebar">
            <form>
                <div className="sidebar-name">количество пересадок</div>
                <div className="checkbox">
                    <input type="checkbox" className="custom-checkbox" id="show-all"/>
                    <label htmlFor="show-all">Все</label>
                </div>
                <div className="checkbox">
                    <input type="checkbox" className="custom-checkbox" id="show-no-transfer"/>
                    <label htmlFor="show-no-transfer">Без пересадок</label>
                </div>
                <div className="checkbox">
                    <input type="checkbox" className="custom-checkbox" id="show-1-transfer"/>
                    <label htmlFor="show-1-transfer">1 пересадка</label>
                </div>
                <div className="checkbox">
                    <input type="checkbox" className="custom-checkbox" id="show-2-transfer"/>
                    <label htmlFor="show-2-transfer">2 пересадки</label>
                </div>
                <div className="checkbox">
                    <input type="checkbox" className="custom-checkbox" id="show-3-transfer"/>
                    <label htmlFor="show-3-transfer">3 пересадки</label>
                </div>
            </form>
        </div>
    )
}