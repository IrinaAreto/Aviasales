export const SET_FILTERS = "SET_FILTERS";

export function setTicketFilters(filters) {
    return {
        type: SET_FILTERS,
        filters: {filters}
    };
}