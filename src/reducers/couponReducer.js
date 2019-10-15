import { COUPON_FETCH_SUCCESS, COUPON_DELETE_SUCCESS, COUPON_FETCH_SPECIFIC_DATA, COUPON_CREATE_SUCCESS, COUPON_UPDATE_SUCCESS } from '../constants/actionTypes'


const initialState = {
    Lists: [],
    deletedStatus: '',
    specificData: [],
    createdStatus: '',
    updatedStatus: ''
}


export default function (state = initialState, action) {

    switch (action.type) {
        case COUPON_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.Lists
            }

        case COUPON_CREATE_SUCCESS:
            return state = {
                ...state,
                createdStatus: action.resp
            }

        case COUPON_FETCH_SPECIFIC_DATA:
            return state = {
                ...state,
                specificData: action.specificData
            }

        case COUPON_UPDATE_SUCCESS:
            return state = {
                ...state,
                updatedStatus: action.resp
            }

        case COUPON_DELETE_SUCCESS:
            return state = {
                ...state,
                deletedStatus: action.resp
            }

        default:
            return state;

    }
}