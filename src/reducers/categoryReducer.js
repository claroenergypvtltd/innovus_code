
const initialstate = {
    Lists: [],
    count: 0
}

export default function (state = initialstate, action) {

    switch (action.type) {
        case "GET_CATEGORYLIST":

            state = {
                ...state,
                Lists: action.List,
                count: action.count
            }
            break;

        default:
            return state;


    }
    return state;
}