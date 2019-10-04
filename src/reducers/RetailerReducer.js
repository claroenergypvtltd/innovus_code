import { RET_COUNTRY_FETCH_SUCCESS, RET_KYC_FETCH_SUCCESS, RETAILER_FETCH_SUCCESS, RETAILER_CREATE_SUCCESS, RETAILER_UPDATE_SUCCESS, RETAILER_DELETE_SUCCESS } from '../constants/actionTypes'

const initialstate = {
    Lists: [],
    count: 0,
    createdData: [],
    updatedData: [],
    deletedData: []
}
export default function (state = initialstate, action) {

    switch (action.type) {

        case RETAILER_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.Lists,
                // count: action.count
            }

        case RETAILER_CREATE_SUCCESS:
            return state = {
                ...state,
                status: action.status,
                message: action.message
                // createdData: action.resp
            }

        case RETAILER_UPDATE_SUCCESS:
            return state = {
                ...state,
                updatedData: action.resp
            }

        case RETAILER_DELETE_SUCCESS:
            return state = {
                ...state,
                deletedData: action.resp
            }
        case RET_KYC_FETCH_SUCCESS:
            return state = {
                ...state,
                KYClist: action.Lists,
                // count: action.count
            }
        case RET_COUNTRY_FETCH_SUCCESS:
            return state = {
                ...state,
                countryLists: action.countryLists,
                // count: action.count
            }

        default:
            return state;


    }
}
