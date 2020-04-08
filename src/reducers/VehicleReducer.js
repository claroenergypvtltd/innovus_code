import { VEHICLE_FETCH_SUCCESS, VEHICLE_SPECIFIC_DATA_SUCCESS, VEHICLE_CREATE_SUCCESS, VEHICLE_UPDATE_SUCCESS, VEHICLE_DELETE_SUCCESS } from '../constants/actionTypes'

const initialState = {
    Lists: [],
    specificData: [],
    createdStatus: "",
    updatedStatus: "",
    deletedStatus: ""
}
export default function (state = initialState, action) {

    switch (action.type) {

        case VEHICLE_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.Lists
            }

        case VEHICLE_SPECIFIC_DATA_SUCCESS:
            return state = {
                ...state,
                specificData: action.Lists
            }

        case VEHICLE_CREATE_SUCCESS:
            return state = {
                ...state,
                createdStatus: action.createdStatus
            }

        case VEHICLE_UPDATE_SUCCESS:
            return state = {
                ...state,
                updatedStatus: action.updatedStatus
            }

        case VEHICLE_DELETE_SUCCESS:
            return state = {
                ...state,
                deletedStatus: action.deletedStatus
            }

        default:
            return state;

    }
}