import {SET_FILTERS} from "./Actions";

const initialState = {
    filters: []
};

export const ticketsFilter = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTERS:
            return action.filters;
        default:
            return state;
    }
}