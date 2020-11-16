import {gettingTickets, initialUrl} from "../components/Url";

export const SET_FILTERS = "SET_FILTERS";
export const GET_TICKETS_FROM_SERVER = "GET_TICKETS_FROM_SERVER";
export const SORT_TICKETS = "SORT_TICKETS";
export const IS_ERROR = "IS_ERROR";
export const IS_LOADING = "IS_LOADING";

export function filtersHasSet(filters) {
    return {
        type: SET_FILTERS,
        filters: filters
    };
}

function itemsHasFetched(items) {
    return {
        type: GET_TICKETS_FROM_SERVER,
        items: items
    };
}

export function itemsHasSorted(sortedItems) {
    return {
        type: SORT_TICKETS,
        items: sortedItems
    }
}

function errorHasSet(boolErr) {
    return {
        type: IS_ERROR,
        err: boolErr
    };
}

function itemsAreLoading(boolLoad) {
    return {
        type: IS_LOADING,
        loading: boolLoad
    };
}

export function getSearchId() {
    return async (dispatch) => {
        dispatch(errorHasSet(false));
        try {
            let response = await fetch(initialUrl);
            const result = await response.json();
            dispatch(fetchTickets(result.searchId));
        } catch (error) {
            dispatch(errorHasSet(true));
        }
    }
}

function fetchTickets(searchId) {
    return async (dispatch) => {
        dispatch(errorHasSet(false));
        dispatch(itemsAreLoading(true));

        try {
            let response = await fetch(gettingTickets + `?searchId=${searchId}`);
            let result = "";
            let sortedResult = [];
            if (response.status !== 200) {
                dispatch(fetchTickets(searchId));
                return;
            } else if (response.status === 200) {
                result = await response.json();
                sortedResult = result.tickets.sort((a, b) => a.price > b.price ? 1 : -1);
            }

            dispatch(itemsHasFetched(sortedResult));

            if (!result.stop) {
                dispatch(fetchTickets(searchId));
                return;
            }

        } catch (error) {
            dispatch(errorHasSet(true));
        }

        dispatch(itemsAreLoading(false));
    }
}
