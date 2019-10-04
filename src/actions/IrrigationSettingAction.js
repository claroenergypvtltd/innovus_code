import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { ORDER_FETCH_SUCCESS, ORDERDETAILS_FETCH_SUCCESS, GET_ERRORS } from '../constants/actionTypes';

import { endPoint } from "../constants";

export const List = (Data) => dispatch => {

    let rows = ''; let page = ''; let searchData = ''; let orderId = ''

    if (Data) {
        page = Data.page ? '&page=' + (Data.page - 1) : '';
        rows = Data.limit ? '&rows=' + Data.limit : '';
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


export const submitIrrigationSetting = (formData, isUpdate) => dispatch => {
    // if (isUpdate) {
    //     httpServices.put("irrigationcost", formData).then(resp => {
    //         if (resp && resp.data) {
    //             toastr.success(resp && resp.message);
    //             dispatch({ type: "IRRIGATION_SETTING_UPDATE_SUCCESS", updatedData: resp.status })
    //         }
    //     }).catch((error) => {
    //         console.error("error", error);
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: error
    //         });
    //     })
    // } else {
    httpServices.post("irrigationcost", formData).then(resp => {
        if (resp && resp.data) {
            toastr.success(resp && resp.message);
            dispatch({ type: "IRRIGATION_SETTING_CREATE_SUCCESS", createdData: resp.status })
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
    })
    // }
}

export const getLocation = (Data) => {

    let countryId = ""; let stateId = "";
    if (Data && Data.stateId) {
        stateId = "countryId=101&stateId=" + Data.stateId
    } else {
        countryId = "countryId=101"
    }

    return httpServices.get('country?' + countryId + stateId).then(resp => {
        if (resp) {
            return resp
            // dispatch({ type: ORDER_FETCH_SUCCESS, Lists: resp.data })            
        }
    }).catch((error) => {
        console.error("error", error);
    })
}