import { PRICE_FETCH_SUCCESS, PRICE_CREATE_SUCCESS, PRICE_DELETE_SUCCESS, PRICE_UPDATE_SUCCESS, PRICE_SPECIFIC_DATA_SUCCESS } from '../constants/actionTypes'; } from '../constants/actionTypes'

const initialstate = {
    Lists: [],
    count: 0,
    specificData: [],
    createdData: [],
    updatedData: [],
    deletedData: []
}

export default function (state = initialstate, action) {

    switch (action.type) {

        case PRICE_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.List,
                count: action.count
            }

        case PRICE_SPECIFIC_DATA_SUCCESS:
            return state = {
                ...state,
                specificData: action.resp
            }

        case PRICE_CREATE_SUCCESS:
            return state = {
                ...state,
                createdData: action.resp
            }

        case PRICE_UPDATE_SUCCESS:
            return state = {
                ...state,
                updatedData: action.resp
            }

        case PRICE_DELETE_SUCCESS:
            return state = {
                ...state,
                deletedData: action.resp
            }

        default:
            return state;

    }
}
