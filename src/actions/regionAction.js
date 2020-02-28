import { httpServices } from '../services/http.services'
import { REGION_FETCH_SUCCESS, REGION_FETCH_SPECIFIC_DATA, GET_ERRORS, REGION_UPDATE_SUCCESS, REGION_CREATE_SUCCESS } from '../constants/actionTypes'
import { toastr } from 'react-redux-toastr'

export const getRegion = (obj) => dispatch => {
    httpServices.get('regionDcs?page=' + obj.page + '&rows=' + obj.rows + '&search=' + obj.search + '&dcCode=' + obj.dcCode).then(resp => {
        if (resp && resp.data) {
            dispatch({ type: REGION_FETCH_SUCCESS, List: resp.data })
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({ type: GET_ERRORS, payload: error });
    })
}

export const getSpecificRegion = (obj) => dispatch => {
    httpServices.get('regionDcs?id=' + obj.id).then(resp => {
        if (resp && resp.data) {
            dispatch({ type: REGION_FETCH_SPECIFIC_DATA, specificData: resp.data })
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({ type: GET_ERRORS, payload: error });

    })

}

export const submitRegion = (regionData) => dispatch => {
    if (regionData && regionData.id) {  // Check whether the Id is empty or not then respectively hit Add and Update
        httpServices.put("regionDc", regionData).then(resp => {
            if (resp && resp.status == "200") {
                toastr.success(resp.message);
                dispatch({ type: REGION_UPDATE_SUCCESS, resp: resp.status })
            }
        }).catch((error) => {
            console.error("error", error);
            dispatch({ type: GET_ERRORS, payload: error })
        })

    } else {
        httpServices.post('regionDc', regionData).then(resp => {
            if (resp) {
                toastr.success(resp.message);
                dispatch({ type: REGION_CREATE_SUCCESS, resp: resp.status })
            }
        }).catch((error) => {
            console.error("error", error);
            dispatch({ type: GET_ERRORS, payload: error })
        })
    }
}

// export const SubmitDC = (regionData) => dispatch => {
    // if (regionData && regionData.id) {  // Check whether the Id is empty or not then respectively hit Add and Update
    //     httpServices.put(endPoint.distributeCentre, regionData).then(resp => {
    //         if (resp) {
    //             toastr.success(resp.message);
    //             dispatch({ type: DC_UPDATE_SUCCESS, resp: resp.status })
    //         }
    //     }).catch((error) => {
    //         console.error("error", error);
    //         dispatch({ type: DC_CREATE_SUCCESS, resp: error.status })
    //     })

    // } else {
    //     httpServices.post(endPoint.distributeCentre, regionData).then(resp => {
    //         if (resp) {
    //             toastr.success(resp.message);
    //             dispatch({ type: DC_CREATE_SUCCESS, resp: resp.status })
    //         }
    //     }).catch(error => {
    //         dispatch({ type: DC_CREATE_SUCCESS, resp: error.status })
    //         console.error("error", error);
    //     })
    // }
// }