import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { CATEGORY_FETCH } from '../constants/actionTypes';
import { endPoint } from "../shared";

export function getCategoryList(params) {
	const { itemPerPage, current_page } = params;
	return (dispatch) => {
		httpServices.get(endPoint.category).then(resp => {
			if (resp && resp.data) {
				dispatch(getlist(resp.data.datas, resp.data.totalCount))
			} else {
				console.log("Error when getting CategoryList");
			}
		})
	}
	function getlist(List, count) {
		return { type: CATEGORY_FETCH, List, count }
	}
}

export function fileUpload(params) {
	const { type, file, storeId } = params;
	var formData = new FormData();
	formData.append("image", file);
	axios.defaults.headers.common['type'] = type;
	axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
	return httpServices.post(endPoint.uploadFiles, formData).then(resp => {

		return resp.data;

	});

}

export function SubmitCategory(category, Id) {

	if (Id) {  // Check whether the Id is empty or not then respectively hit Add and Update
		httpServices.put(endPoint.category, category).then(resp => {
			if (resp) {
				toastr.success(resp.message);
			} else {
				toastr.warning(resp.message);
			}
		})

	} else {
		httpServices.post(endPoint.category, category).then(resp => {
			if (resp) {
				toastr.success(resp.message);
			} else {
				toastr.warning(resp.message);
			}
		})
	}

}

export function DeleteCategory(id) {
	return httpServices.remove(endPoint.categoryWithId + id).then(response => {
		if (response) {
			toastr.success(response.message);
		}
	}).catch((error) => {
		console.log("Delete :", error.response);
	})
}



export function getSpecificCategory(id) { //getSpecificCategory
	return httpServices.get(endPoint.categoryDetailsWId + id).then(resp => {
		if (resp.data) {
			return resp;
		}
	}).catch((error) => {
		console.log("error", error.resp);
	})
}

