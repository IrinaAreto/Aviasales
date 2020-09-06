import React, {useState, useEffect} from 'react';
import {Header} from "./components/Header";
import {SidebarFiler} from "./components/Sidebar";
import {initialUrl} from "./components/Url";
import './App.css';

function App() {
    const [isError, setIsError] = useState(false);
    const [searchId, setSearchId] = useState("");

    useEffect(() => {
        getSearchId();
    }, []);

    const getSearchId = async () => {
        setIsError(false);
        try {
            let response = await fetch(initialUrl);
            const result = await response.json();
            console.log(result.searchId);
            setSearchId(result.searchId);
        } catch (error) {
            setIsError(true);
            console.log("error: ", error);
        }
    }

    return (
        <div className="App">
            <div className="layout">
                <Header/>
                <SidebarFiler/>
            </div>
        </div>
    );
}

export default App;
