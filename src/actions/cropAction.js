import { httpServices } from '../services/http.services'
import { GET_CROP_LIST } from '../constants/actionTypes';
import { endPoint } from "../constants";

export const getCropList = (Data) => dispatch => {
    let Param = ''; let page = ''; let rows = ''; let searchData = '';

    if (Data.isallcrop) {
        Param = Data.isallcrop ? "isallcrop=true" : '';
        page = Data.page ? '&page=' + Data.page : '';
        rows = Data.limit ? '&rows=' + Data.limit : '';
        searchData = Data.search ? '&search=' + Data.search : '';
    }

    httpServices.get(endPoint.products + '?' + Param + searchData + page + rows).then(resp => {
        if (resp && resp.data) {
            debugger;
            dispatch({ type: GET_CROP_LIST, List: resp.data, count: resp.data.totalCount })
        } else {
            console.log("Error when getting Product List");
        }
    }).catch((error) => {
        console.log("error", error);
    })
}
