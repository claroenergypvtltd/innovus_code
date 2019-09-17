import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { PRICE_FETCH_SUCCESS, PRICE_CREATE_SUCCESS, PRICE_DELETE_SUCCESS, PRICE_UPDATE_SUCCESS, PRICE_SPECIFIC_DATA_SUCCESS } from '../constants/actionTypes';

import { endPoint } from "../constants";

export const getPriceList = () => dispatch => {
    return httpServices.get(endPoint.price).then(resp => {
        if (resp && resp.data) {
            dispatch({ type: PRICE_FETCH_SUCCESS, List: resp.data.datas })
            return resp.data;
        } else {
            console.log("Error when getting PriceList");
        }
    }).catch((error) => {
        console.error("error", error);
    })
}