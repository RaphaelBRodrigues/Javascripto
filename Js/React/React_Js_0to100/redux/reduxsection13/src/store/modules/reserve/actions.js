export function addReserve(trip) {
    return {
        type: "ADD_RESERVE",
        payload: trip
    };
}

export function addReserveRequest(trip) {
    return {
        type: "ADD_RESERVE",
        payload: trip
    };
}

export function addReserveSuccess(trip) {
    return {
        type: "ADD_RESERVE",
        payload: trip
    };
}




export function removeReserve(id) {
    return {
        type: "REMOVE_RESERVE",
        payload: id
    }
}

export function increaseReserveAmount(id) {
    return {
        type: "INCREASE_RESERVE_AMOUNT",
        payload: id
    }
}

export function decreaseReserveAmount(id) {
    return {
        type: "DECREASE_RESERVE_AMOUNT",
        payload: id
    }
}