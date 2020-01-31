import { httpServices } from "../services"
import toastr from 'react-redux-toastr'
export const getVersionControl = (Data) => {
    return httpServices.get('configSettings').then(resp => {
        if (resp) {
            return resp;
            //dispatch({ type: APP_VERSION_FETCH_SUCCESS, resp })
        } else {
            // dispatch({ type: APP_VERSION_FETCH_SUCCESS, resp: [] })
        }
    })
        .catch((error) => {
            // dispatch({ type: APP_VERSION_FETCH_SUCCESS, resp: [] })
            console.error("error", error.resp);
        })

}

export const SubmitSetting = (Data) => {
    return httpServices.post('configSettings', Data).then(resp => {
        if (resp) {
            return resp;
        }
    }).catch((error) => {
        // dispatch({ type: APP_VERSION_FETCH_SUCCESS, resp: [] })
        console.error("error", error.resp);
    })

}

export const getQuantityType = () => {
    return httpServices.get('quantityUnits').then(resp => {
        if (resp && resp.data) {
            return resp.data
        }
    }).catch((error) => {
        console.error("error", error);
        // dispatch({ type: GET_ERRORS, payload: error });
    })
}

export const removeQuantityType = (Data) => {
    httpServices.remove('quantityUnits', Data).then(response => {
        if (response) {
            toastr.success(response.message);
        }
    }).catch((error) => {
        console.error("error", error);
        // dispatch({ type: GET_ERRORS, payload: error });
    })
}