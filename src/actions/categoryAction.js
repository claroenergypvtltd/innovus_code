import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../constants/actionTypes';
import { endPoint } from "../constants";

export const getCategoryList = () => dispatch => {
	httpServices.get(endPoint.category).then(resp => {
		if (resp && resp.data) {
			dispatch({ type: CATEGORY_FETCH_SUCCESS, List: resp.data.datas, count: resp.data.totalCount })
		} else {
			console.error("Error when getting CategoryList");
		}
	}).catch((error) => {
		console.error("error", error);
	})
}


export const SubmitCategory = (category, Id) => dispatch => {

	if (Id) {  // Check whether the Id is empty or not then respectively hit Add and Update
		httpServices.put(endPoint.category, category).then(resp => {
			if (resp) {
				toastr.success(resp.message);
				dispatch({ type: CATEGORY_UPDATE_SUCCESS, resp: resp.status })
			}
		}).catch((error) => {
			console.error("error", error);
			dispatch({ type: CATEGORY_CREATE_SUCCESS, resp: error.status })
		})

	} else {
		httpServices.post(endPoint.category, category).then(resp => {
			if (resp) {
				toastr.success(resp.message);
				dispatch({ type: CATEGORY_CREATE_SUCCESS, resp: resp.status })
			}
		}).catch(error => {
			dispatch({ type: CATEGORY_CREATE_SUCCESS, resp: error.status })
			console.error("error", error);
		})
	}

}

export const DeleteCategory = (id) => dispatch => {
	httpServices.remove(endPoint.category, id).then(response => {
		if (response) {
			toastr.success(response.message);
			dispatch({ type: CATEGORY_DELETE_SUCCESS, resp: response.status })
		}
	}).catch((error) => {
		console.error("Delete :", error.response);
		dispatch({ type: CATEGORY_DELETE_SUCCESS, resp: error.status })
	})
}



export const getSpecificCategory = (Data, isSubCategory) => dispatch => { //getSpecificCategory

	let IdText = "";
	if (isSubCategory) {
		IdText = endPoint.categoryId;
	} else {
		IdText = endPoint.id;
	}
	let rows = ''; let page = ''; let searchData = '';

	if (Data && Data.limit) {
		page = Data.page ? '&page=' + Data.page : '';
		rows = Data.limit ? '&rows=' + Data.limit : '';
		searchData = Data.search ? '&search=' + Data.search : '';
	}

	return httpServices.get(endPoint.category + '?' + IdText + '=' + Data.categoryId + searchData + page + rows).then(resp => {

		if (resp.data) {
			dispatch({ type: CATEGORY_SPECIFIC_DATA_SUCCESS, resp })
			return resp;
		}
	}).catch((error) => {
		console.error("error", error.resp);
	})
}

