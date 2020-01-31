import { httpServices } from "../services"

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
    httpServices.get().then(resp => {

    }).catch((error) => {
        console.error("error", error);
        // dispatch({ type: GET_ERRORS, payload: error });
    })
}