import { httpServices } from '../services/http.services'
import axios from 'axios'
import { GET_ERRORS } from '../constants/actionTypes';
import { toastr } from 'react-redux-toastr'
import { endPoint } from "../constants";
import { RET_USER_FETCH_SUCCESS, RET_COUNTRY_FETCH_SUCCESS, RET_KYC_FETCH_SUCCESS, RETAILER_FETCH_SUCCESS, RETAILER_CREATE_SUCCESS, RETAILER_DELETE_SUCCESS, RETAILER_UPDATE_SUCCESS } from '../constants/actionTypes';

export const SubmitRetailer = (retailerData, updateRetailer) => dispatch => {
    if (updateRetailer) {
        httpServices.put(endPoint.user, retailerData).then(resp => {
            if (resp) {
                dispatch({ type: RETAILER_CREATE_SUCCESS, status: resp.status, message: resp.message })
            }
        }).catch((error) => {
            console.log("error", error);
        })
    } else {
        httpServices.post(endPoint.retailSignUp, retailerData).then(resp => {
            dispatch({ type: RETAILER_CREATE_SUCCESS, status: resp.status, message: resp.message })
        }).catch((error) => {
            dispatch({ type: RETAILER_CREATE_SUCCESS, status: error.status, message: error.message })
        })
    }
}
export const fetchRetailers = (user) => dispatch => {
    let httpMethod = "";
    if (user.isEdit) {
        httpMethod = httpServices.get(endPoint.user + '?userId=' + user.retailerId);
    } else {
        httpMethod = httpServices.post(endPoint.user, user);
    }
    httpMethod.then(resp => {
        if (resp && resp.data) {
            dispatch({ type: RETAILER_FETCH_SUCCESS, Lists: resp.data })
        }
    }).catch((error) => {
        dispatch({ type: RETAILER_FETCH_SUCCESS, error: error })
    })
}
export const deleteRetailer = deleteId => dispatch => {
    httpServices.remove(endPoint.user, deleteId).then(res => {
        if (res) {
            toastr.success(res.message);
            dispatch({ type: RETAILER_DELETE_SUCCESS, resp: res.status })
        }
    }).catch((e) => {
        console.error(e);
        dispatch({
            type: GET_ERRORS,
            payload: e,
        });
    });
};
export const getKYClist = (ProfID) => dispatch => {
    httpServices.get(endPoint.kyc + '?userId=' + ProfID).then(resp => {
        dispatch({ type: RET_KYC_FETCH_SUCCESS, Lists: resp.data })
    }).catch((error) => {
        dispatch({ type: RET_KYC_FETCH_SUCCESS, error: error })
    })
}
export const getCountryList = (ProfID) => dispatch => {
    httpServices.get(endPoint.country).then(resp => {
        dispatch({ type: RET_COUNTRY_FETCH_SUCCESS, countryLists: resp.data })
    }).catch((error) => {
        dispatch({ type: RET_COUNTRY_FETCH_SUCCESS, error: error })
    })
}
export const getStateCity = (Data) => {

    let countryId = ""; let stateId = "";
    if (Data.countryId && Data.stateId) {
        stateId = 'country?countryId=101&stateId=' + Data.stateId;
    }
    else {

        countryId = 'country?countryId=101'
    }

    return httpServices.get(countryId + stateId).then(resp => {
        if (resp) {
            return resp
        }
    }).catch((error) => {
    })
}


export const getUsersDetails = () => dispatch => {
    httpServices.get(endPoint.getusers).then(resp => {
        dispatch({ type: RET_USER_FETCH_SUCCESS, Lists: resp.data })
    }).catch((error) => {
        dispatch({ type: RET_USER_FETCH_SUCCESS, error: error })
    })
}
export const getOrderReports = (gettype) => dispatch => {
    let servietype;
    switch (gettype) {
        case 'year':
            servietype = endPoint.getyearorders;
            break;
        case 'month':
            servietype = endPoint.getmonthorders;
            break;
        case 'week':
            servietype = endPoint.getweekorders;
            break;
    }
    httpServices.get(servietype).then(resp => {
        dispatch({ type: RET_USER_FETCH_SUCCESS, Lists: resp.data })
    }).catch((error) => {
        dispatch({ type: RET_USER_FETCH_SUCCESS, error: error })
    })
}
export const updateStatusRetailer = (updateDatas) => {
    return httpServices.put(endPoint.user, updateDatas).then(resp => {
        return resp;
    }).catch((error) => {
    })
}
export const getStateUsers = (obj) => {
    delete obj.countryId;
    return httpServices.post(endPoint.user, obj).then(resp => {
        if (resp) {
            console.log('resp---', resp);
            return resp
        }
    }).catch((error) => {
    })
}


