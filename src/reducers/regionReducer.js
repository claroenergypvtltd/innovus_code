import { REGION_FETCH_SUCCESS, REGION_CREATE_SUCCESS, REGION_FETCH_SPECIFIC_DATA, REGION_UPDATE_SUCCESS } from '../constants/actionTypes'

const initialState = {
    Lists: [],
    specificData: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGION_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.List
            }

        case REGION_FETCH_SPECIFIC_DATA:
            return state = {
                ...state,
                specificData: action.specificData
            }

        case REGION_CREATE_SUCCESS:
            return state = {
                ...state,
                createdData: action.createdData
            }

        case REGION_UPDATE_SUCCESS:
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