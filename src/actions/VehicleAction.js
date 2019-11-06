import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
// import { ORDER_FETCH_SUCCESS, ORDERDETAILS_FETCH_SUCCESS, GET_ERRORS } from '../constants/actionTypes';
import {
    VEHICLE_FETCH_SUCCESS, VEHICLE_SPECIFIC_DATA_SUCCESS,
    VEHICLE_CREATE_SUCCESS, VEHICLE_UPDATE_SUCCESS,
    VEHICLE_DELETE_SUCCESS, GET_ERRORS
} from '../constants/actionTypes'

import { endPoint } from "../constants";

export const fetchVehicle = (vehicle) => dispatch => {
    let httpMethod = "";
    // if (vehicle && vehicle.vehicleId) {
    //     httpMethod = httpServices.get(endPoint.vehicle,vehicle);
    // } else {
    httpMethod = httpServices.post(endPoint.vehicle, vehicle);
    // }
    httpMethod.then(resp => {
        if (resp && resp.data) {
            if (vehicle && vehicle.id) {
                let respData = resp.data && resp.data.datas ? resp.data.datas : [];
                dispatch({ type: VEHICLE_SPECIFIC_DATA_SUCCESS, Lists: respData })
            } else {
                dispatch({ type: VEHICLE_FETCH_SUCCESS, Lists: resp.data })
            }
        }
    }).catch((error) => {
        dispatch({ type: GET_ERRORS, payload: error });
    })
}

export const getVehicleType = () => {
    return httpServices.post(endPoint.vehiclesCategory, { search: '' }).then(resp => {
        if (resp && resp.data) {
            return resp.data;
        }
    }).catch((error) => {
        console.error("error", error);
    })
}


// export const DeleteIrrigationSetting = (id) => dispatch => {
//     httpServices.remove("irrigationcost", id).then(response => {
//         if (response) {
//             toastr.success(response.message);
//             dispatch({ type: AGENT_DELETE_SUCCESS, deletedStatus: response.status })
//         }
//     }).catch((error) => {
//         console.error("Delete :", error.response);
//         dispatch({ type: GET_ERRORS, payload: error });
//     })
// }


export const submitVehicle = (formData, isEdit) => dispatch => {
    let httpMethod = "";

    if (isEdit) {
        httpMethod = httpServices.put(endPoint.submitVehicle, formData);
    } else {
        httpMethod = httpServices.post(endPoint.submitVehicle, formData);
    }

    httpMethod.then(resp => {
        if (resp && resp.message) {
            toastr.success(resp && resp.message);

            if (isEdit) {
                dispatch({ type: VEHICLE_UPDATE_SUCCESS, updatedStatus: resp.status })
            } else {
                dispatch({ type: VEHICLE_CREATE_SUCCESS, createdStatus: resp.status })
            }
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
    })
}


export const submitType = (formData) => {
    return httpServices.post(endPoint.Type, formData).then(resp => {
        if (resp && resp.message) {
            toastr.success(resp && resp.message);
            return resp;
        }
    }).catch((error) => {
        console.error("error", error);
    })
}

