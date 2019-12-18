import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { ORDER_FETCH_SUCCESS, ORDERDETAILS_FETCH_SUCCESS, ORDERTRACK_FETCH_SUCCESS, GET_ERRORS } from '../constants/actionTypes';

import { endPoint } from "../constants";

export const getOrderList = (Data) => dispatch => {

    let rows = ''; let page = ''; let searchData = ''; let orderId = ''; let userId = '';

    if (Data) {
        page = (Data.page || Data.page == 0) ? '&page=' + (Data.page) : '';
        rows = Data.limit ? '&rows=' + Data.limit : '';
        searchData = Data.search ? '&search=' + Data.search : '';
        orderId = Data.orderId ? Data.orderId : '';
        userId = Data.userId ? '&userId=' + Data.userId : '';
    }
    httpServices.get('order' + '?orderId=' + orderId + userId + searchData + page + rows).then(resp => {
        if (resp && resp.data) {
            if (Data.orderId) {
                dispatch({ type: ORDERDETAILS_FETCH_SUCCESS, Lists: resp.data })
            } else {
                dispatch({ type: ORDER_FETCH_SUCCESS, Lists: resp.data })
            }
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({ type: GET_ERRORS, payload: error });
    })
}

export const getTrackDetails = (orderId) => dispatch => {
    httpServices.get('orderWareHouse' + '?orderId=' + orderId).then(resp => {
        if (resp && resp.data) {
            dispatch({ type: ORDERTRACK_FETCH_SUCCESS, trackLists: resp.data })
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({ type: GET_ERRORS, payload: error });
    })
}


export const SubmitOrderStatus = (statusData) => {
    return httpServices.post('orderWareHouse', statusData).then(resp => {
        if (resp) {
            toastr.success(resp.message);
            return resp
        }
    }).catch(error => {
        console.error("error", error);
    })
}
export const updateOrderStatus = (statusData) => {
    return httpServices.post('orderWareHouse', statusData).then(resp => {
        if (resp) {
            toastr.success(resp.message);
            return resp
        }
    }).catch(error => {
        console.error("error", error);
    })
}

export const SubmitOrderCredit = (Data) => {
    return httpServices.post('credit', Data).then(resp => {
        if (resp) {
            toastr.success(resp.message);
            return resp
        }
    }).catch(error => {
        console.error("error", error);
    })
}

