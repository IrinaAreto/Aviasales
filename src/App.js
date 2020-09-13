import React from 'react';
import {Header} from "./components/Header";
import {SidebarFiler} from "./components/Sidebar";
import {MainPart} from "./components/MainPart";
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="layout">
                <Header/>
                <SidebarFiler/>
                <MainPart/>
            </div>
        </div>
    );
}

export default App;
