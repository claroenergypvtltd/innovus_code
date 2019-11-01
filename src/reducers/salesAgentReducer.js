import { AGENT_FETCH_SUCCESS, AGENT_CREATE_SUCCESS, AGENT_UPDATE_SUCCESS, AGENT_DELETE_SUCCESS, AGENT_SPECIFIC_DATA_SUCCESS } from '../constants/actionTypes'

const initialState = {
    Lists: [],
    specificData: [],
    createdData: "",
    updatedData: [],
    deletedData: []
}

export default function (state = initialState, action) {

    switch (action.type) {

        case AGENT_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.Lists,
            }

        case AGENT_SPECIFIC_DATA_SUCCESS:
            return state = {
                ...state,
                specificData: action.resp
            }

        case AGENT_CREATE_SUCCESS:
            return state = {
                ...state,
                createdStatus: action.createdStatus
            }

        case AGENT_UPDATE_SUCCESS:
            return state = {
                ...state,
                updatedStatus: action.updatedStatus
            }

        case AGENT_DELETE_SUCCESS:
            return state = {
                ...state,
                deletedStatus: action.resp
            }

        default:
            return state;

    }
}
