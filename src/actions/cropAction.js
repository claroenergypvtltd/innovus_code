import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
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

    return httpServices.get(endPoint.category + '?' + Param + searchData + page + rows).then(resp => {
        if (resp && resp.data) {
            dispatch({ type: GET_CROP_LIST, List: resp.data.datas, count: resp.data.totalCount })
            return resp;
        } else {
            console.log("Error when getting CategoryList");
        }
    }).catch((error) => {
        console.log("error", error);
    })
}
