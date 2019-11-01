import { httpServices } from '../services/http.services'
import { endPoint } from "../constants";
import { COUPON_FETCH_SUCCESS, GET_ERRORS, COUPON_DELETE_SUCCESS, COUPON_UPDATE_SUCCESS, COUPON_FETCH_SPECIFIC_DATA, COUPON_CREATE_SUCCESS } from '../constants/actionTypes'
import { toastr } from 'react-redux-toastr'


export const getCouponList = (Data) => dispatch => {

    let page = '';
    let search = '';
    let rows = '';
    if (Data) {
        page = Data.page ? (Data.page - 1) : '';
        search = Data.search ? Data.search : '';
        rows = Data.limit ? Data.limit : '';
    }

    httpServices.get(endPoint.coupon + '?search=' + search + '&page=' + page + '&rows=' + rows).then(resp => {
        if (resp && resp.data) {
            dispatch({ type: COUPON_FETCH_SUCCESS, Lists: resp.data })
        }
        else {
            console.error("Error when getting coupon List");
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
    })
}


export const DeleteCoupon = (id) => dispatch => {
    httpServices.remove(endPoint.coupon, id).then(response => {

        if (response) {
            toastr.success(response.message);
            dispatch({ type: COUPON_DELETE_SUCCESS, resp: response.status })
        }
    }).catch((error) => {
        console.error("Delete :", error.response);
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
    })
}


export const getSpecificCouponData = (couponId) => dispatch => {

    httpServices.get(endPoint.coupon + '?couponId=' + couponId).then(resp => {
        if (resp.data) {
            dispatch({ type: COUPON_FETCH_SPECIFIC_DATA, specificData: resp.data })

        }
    }).catch(error => {
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
        console.error("error", error);
    })
}


export const SubmitCoupon = (coupon, Id) => dispatch => {
    let couponId = Id;
    if (Id) {  // Check whether the Id is empty or not then respectively hit Add and Update
        httpServices.put(endPoint.coupon + '?couponId=' + couponId, coupon).then(resp => {
            if (resp) {
                toastr.success(resp.message);
                dispatch({ type: COUPON_UPDATE_SUCCESS, resp: resp.status })
            }
        }).catch((error) => {
            console.error("error", error);
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })

    } else {
        httpServices.post(endPoint.coupon, coupon).then(resp => {
            if (resp) {
                toastr.success(resp.message);
                dispatch({ type: COUPON_CREATE_SUCCESS, resp: resp.status })
            }
        }).catch(error => {
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
            console.error("error", error);
        })
    }
}

