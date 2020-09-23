import {createStore} from "redux";
import {ticketsFilter} from "./Reducer";

export const store = createStore(ticketsFilter, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());