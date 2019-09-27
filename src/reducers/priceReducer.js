import { PRICE_FETCH_SUCCESS, PRICE_CREATE_SUCCESS, PRICE_DELETE_SUCCESS, PRICE_UPDATE_SUCCESS, PRICE_SPECIFIC_DATA_SUCCESS } from '../constants/actionTypes';

const initialState = {
    Lists: [],
    count: 0,
    specificData: [],
    createdData: [],
    updatedData: [],
    deletedData: []
}

export default function (state = initialState, action) {

    switch (action.type) {

        case PRICE_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.List
            }

        case PRICE_SPECIFIC_DATA_SUCCESS:
            return state = {
                ...state,
                specificData: action.specificData
            }

        case PRICE_CREATE_SUCCESS:
            return state = {
                ...state,
                createdData: action.createdData
            }

        case PRICE_UPDATE_SUCCESS:
            return state = {
                ...state,
                updatedData: action.updatedData
            }

        case PRICE_DELETE_SUCCESS:
            return state = {
                ...state,
                deleteStatus: action.deleteStatus
            }

        default:
            return state;

    }
}
