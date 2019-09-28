import { ORDER_FETCH_SUCCESS, ORDERDETAILS_FETCH_SUCCESS } from '../constants/actionTypes';


const initialState = {
    Lists: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ORDER_FETCH_SUCCESS:
            return {
                ...state,
                Lists: action.Lists
            }

        case ORDERDETAILS_FETCH_SUCCESS:
            return {
                ...state,
                DetailsList: action.Lists
            }
        default:
            return state;
    }
}