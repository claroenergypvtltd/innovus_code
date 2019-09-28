import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { ORDER_FETCH_SUCCESS, ORDERDETAILS_FETCH_SUCCESS, GET_ERRORS } from '../constants/actionTypes';

import { endPoint } from "../constants";

export const getOrderList = (Data) => dispatch => {

    let rows = ''; let page = ''; let searchData = ''; let orderId = ''

    if (Data) {
        // page = Data.page ? '&page=' + Data.page : '';
        // rows = Data.limit ? '&rows=' + Data.limit : '';
        searchData = Data.search ? '&search=' + Data.search : '';
        orderId = Data.orderId ? Data.orderId : ''
    }

    return httpServices.get('order' + '?orderId=' + orderId + searchData + page + rows).then(resp => {
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