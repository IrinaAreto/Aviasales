import {SET_FILTERS, GET_TICKETS_FROM_SERVER, SORT_TICKETS, IS_ERROR, IS_LOADING} from "./Actions";
import {combineReducers} from "redux";

const initialState = {
    filters: [],
    items: [],
    err: false,
    loading: false
};

const ticketsFilter = (state = initialState.filters, action) => {
    switch (action.type) {
        case SET_FILTERS:
            return action.filters;
        default:
            return state;
    }
}

const getItems = (state = initialState.items, action) => {
    switch (action.type) {
        case GET_TICKETS_FROM_SERVER:
            let newItems = state.slice().concat(action.items);
            let newState = [...newItems];
            return newState;

        case SORT_TICKETS:
            return action.items;

        default:
            return state;
    }
}

const setError = (state = initialState.err, action) => {
    switch (action.type) {
        case IS_ERROR:
            return action.err;
        default:
            return state;
    }
}

const setLoading = (state = initialState.loading, action) => {
    switch (action.type) {
        case IS_LOADING:
            return action.loading;
        default:
            return state;
    }
}

export const reducer = combineReducers({
    filters: ticketsFilter,
    items: getItems,
    err: setError,
    loading: setLoading
})