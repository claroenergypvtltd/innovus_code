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
    return httpServices.remove('quantityUnits', Data).then(resp => {
        if (resp && resp.status == "200") {
            return resp;
        }
    }).catch((error) => {
        console.error("error", error);
        // dispatch({ type: GET_ERRORS, payload: error });
    })
}

export const SubmitQuantityType = (Data) => {
    return httpServices.post('quantityUnits', Data).then(resp => {
        if (resp) {
            return resp;
        }
    }).catch((error) => {
        console.error("error", error.resp);
    })

}

export const SubmitEcom = (Data, isEdit) => {
    if (isEdit) {
        return httpServices.put('privacypolicy', Data).then(resp => {
            if (resp) {
                return resp;
            }
        }).catch((error) => {
            console.error("error", error.resp);
        })
    } else {
        return httpServices.post('privacypolicy', Data).then(resp => {
            if (resp) {
                return resp;
            }
        }).catch((error) => {
            console.error("error", error.resp);
        })
    }
}

export const getEcom = (type, id) => {

    let Id = '';
    if (id) {
        Id = '&id=' + id
    }

    return httpServices.get('privacypolicy?type=' + type + Id).then(resp => {
        if (resp) {
            return resp;
        }
    }).catch((error) => {
        console.error("error", error.resp);
    })
}


