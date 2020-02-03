import { httpServices } from '../services/http.services'
import { REGION_FETCH_SUCCESS, REGION_FETCH_SPECIFIC_DATA, GET_ERRORS } from '../constants/actionTypes'

export const getRegion = (obj) => dispatch => {
    let page = obj.page
    let rows = obj.rows
    httpServices.get('regionDcs?page=' + page + '&rows=' + rows).then(resp => {
        if (resp && resp.data) {
            dispatch({ type: REGION_FETCH_SUCCESS, List: resp.data })
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({ type: GET_ERRORS, payload: error });
    })
}

export const getSpecificRegion = (obj) => dispatch => {
    let id = obj.id
    httpServices.get('regionDcs?id=' + id).then(resp => {
        if (resp && resp.data) {
            dispatch({ type: REGION_FETCH_SPECIFIC_DATA, specificData: resp.data })
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({ type: GET_ERRORS, payload: error });

    })

}


// export const SubmitDC = (regionData) => dispatch => {
//     if (regionData && regionData.id) {  // Check whether the Id is empty or not then respectively hit Add and Update
//         httpServices.put(endPoint.distributeCentre, regionData).then(resp => {
//             if (resp) {
//                 toastr.success(resp.message);
//                 dispatch({ type: DC_UPDATE_SUCCESS, resp: resp.status })
//             }
//         }).catch((error) => {
//             console.error("error", error);
//             dispatch({ type: DC_CREATE_SUCCESS, resp: error.status })
//         })

//     } else {
//         httpServices.post(endPoint.distributeCentre, regionData).then(resp => {
//             if (resp) {
//                 toastr.success(resp.message);
//                 dispatch({ type: DC_CREATE_SUCCESS, resp: resp.status })
//             }
//         }).catch(error => {
//             dispatch({ type: DC_CREATE_SUCCESS, resp: error.status })
//             console.error("error", error);
//         })
//     }
// }