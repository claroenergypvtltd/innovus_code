import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { CATEGORY_FETCH } from '../constants/actionTypes';
import { endPoint } from "../constants";

export const getCategoryList = (params) => {
	return (dispatch) => {
		httpServices.get(endPoint.category).then(resp => {
			if (resp && resp.data) {
				dispatch(getlist(resp.data.datas, resp.data.totalCount))
			} else {
				console.log("Error when getting CategoryList");
			}
		}).catch((error) => {
			console.log("error", error);
		})
	}
}

export const getlist = (List, count) => {
	return { type: CATEGORY_FETCH, List, count }
}

export const fileUpload = (params) => {
	const { type, file, storeId } = params;
	var formData = new FormData();
	formData.append("image", file);
	axios.defaults.headers.common['type'] = type;
	axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
	return httpServices.post(endPoint.uploadFiles, formData).then(resp => {

		return resp.data;

	});

}

export const SubmitCategory = (category, Id) => {

	if (Id) {  // Check whether the Id is empty or not then respectively hit Add and Update
		return httpServices.put(endPoint.category, category).then(resp => {
			if (resp) {
				toastr.success(resp.message);
				return resp;
			} else {
				toastr.warning(resp.message);
			}
		}).catch((error) => {
			console.log("error", error);
		})

	} else {
		return httpServices.post(endPoint.category, category).then(resp => {
			if (resp) {
				toastr.success(resp.message);
				return resp;
			} else {
				toastr.warning(resp.message);
			}
		}).catch((error) => {
			console.log("error", error);
		})
	}

}

export const DeleteCategory = (id) => {
	return httpServices.remove(endPoint.category, id).then(response => {
		if (response) {
			toastr.success(response.message);
			return response;
		}
	}).catch((error) => {
		console.log("Delete :", error.response);
	})
}



export const getSpecificCategory = (id, isSubCategory) => { //getSpecificCategory

	let IdText = "";
	if (isSubCategory) {
		IdText = endPoint.categoryId;
	} else {
		IdText = endPoint.id;
	}

	return httpServices.get(endPoint.category + endPoint.question + IdText + endPoint.equalTo + id).then(resp => {

		if (resp.data) {
			return resp;
		}
	}).catch((error) => {
		console.log("error", error.resp);
	})
}

