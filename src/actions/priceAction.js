import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { PRICE_FETCH_SUCCESS, PRICE_CREATE_SUCCESS, PRICE_DELETE_SUCCESS, PRICE_UPDATE_SUCCESS, PRICE_SPECIFIC_DATA_SUCCESS, GET_ERRORS } from '../constants/actionTypes';

import { endPoint } from "../constants";

export const getPriceList = (formData) => dispatch => {
    formData.pages = formData.page ? formData.page : '';
    formData.rows = formData.limit ? formData.limit : '';
    formData.search = formData.search ? formData.search : '';

    return httpServices.post('inventorys', formData).then(resp => {
        if (resp && resp.data) {
            if (formData.categoryId) {
                dispatch({ type: PRICE_SPECIFIC_DATA_SUCCESS, specificData: resp.data })
                return resp.data;
            } else {
                dispatch({ type: PRICE_FETCH_SUCCESS, List: resp.data })
            }
        } else {
            console.log("Error when getting PriceList");
        }
    }).catch((error) => {
        console.error("error", error);
    })
}

export const submitPrice = (formData, isUpdate) => dispatch => {
    if (isUpdate) {
        httpServices.put('inventory', formData).then(resp => {
            if (resp && resp.data) {

                dispatch({ type: PRICE_UPDATE_SUCCESS, updatedData: resp.status })
            }
        }).catch((error) => {
            console.error("error", error);
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })
    } else {
        httpServices.post('inventory', formData).then(resp => {
            if (resp && resp.data) {

                dispatch({ type: PRICE_CREATE_SUCCESS, createdData: resp.status })
            }
        }).catch((error) => {
            console.error("error", error);
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })
    }
}

