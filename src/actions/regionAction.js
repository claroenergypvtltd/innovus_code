import { httpServices } from '../services/http.services'

export const getRegion = () => {
    httpServices.get().then(resp => {

    }).catch((error) => {
        console.error("error", error);
        dispatch({ type: GET_ERRORS, payload: error });
    })
}