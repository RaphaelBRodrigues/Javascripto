import produce from 'immer';

function reserve(state = [], action) {
    switch (action.type) {
        case "ADD_RESERVE":
            return produce(state, draft => {
                const tripIndex = draft.findIndex((trip) => trip.id === action.payload.id);
                console.log(tripIndex);
                if (tripIndex >= 0) {
                    draft[tripIndex].amount += 1;
                } else {
                    draft.push({
                        ...action.payload,
                        amount: 1
                    });
                }
            });
        case "REMOVE_RESERVE":
            return produce(state, draft => {
                const tripIndex = draft.findIndex(trip => trip.id === action.payload);
                draft.splice(tripIndex, 1);
            });
        case "INCREASE_RESERVE_AMOUNT":
            return produce(state, draft => {
                const tripIndex = draft.findIndex(trip => trip.id === action.payload);
                draft[tripIndex].amount += 1;
            });
        case "DECREASE_RESERVE_AMOUNT":
            return produce(state, draft => {
                const tripIndex = draft.findIndex(trip => trip.id === action.payload);
                draft[tripIndex].amount -= 1;
            });
        case "DECREASE_RESERVE_AMOUNT":
            return produce(state, draft => {
                const tripIndex = draft.findIndex(trip => trip.id === action.payload);
                draft[tripIndex].amount -= 1;
            });
        default:
            return state;
    }
}

export default reserve;