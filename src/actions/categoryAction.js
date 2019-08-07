import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { CATEGORY_FETCH } from '../constants/actionTypes';

export const CategoryAction = {}

CategoryAction.getCategoryList = getCategoryList;
CategoryAction.AddCategory = AddCategory;
CategoryAction.fileUpload = fileUpload;
CategoryAction.DeleteCategory = DeleteCategory;
CategoryAction.editCategory = editCategory;

export function getCategoryList(params) {
	const { itemPerPage, current_page } = params;
	return (dispatch) => {
		httpServices.get('category?itemsPerPage=' + itemPerPage + '&page=' + current_page).then(resp => {
			if (resp.data) {
				//alert("Success");
				dispatch(getlist(resp.data, resp.status))
			} else {
				console.log("Error when getting CategoryList");
			}
		})
	}
	function getlist(List, count) {
		return { type: CATEGORY_FETCH, List, count }
	}
}

function fileUpload(params) {
	const { type, file, storeId } = params;
	var formData = new FormData();
	formData.append("image", file);
	axios.defaults.headers.common['type'] = type;
	axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
	return httpServices.post('uploadFiles', formData).then(resp => {

		return resp.data;

	});

}

export function AddCategory(category, Id) {
	return (dispatch) => {

		if (Id) {
			httpServices.put('category', category).then(resp => {
				if (resp) {
					toastr.success(resp.message);
				} else {
					toastr.warning(resp.message);
				}
			})

		} else {
			httpServices.post('category', category).then(resp => {
				if (resp) {
					toastr.success(resp.message);
				} else {
					toastr.warning(resp.message);
				}
			})
		}

	}
}

function DeleteCategory(id) {
	return httpServices.remove('category?categoryId=' + id).then(response => {
		if (response) {
			toastr.success(response.message);
		}
	}).catch((error) => {
		console.log("Delete :", error.response);
	})
}



function editCategory(id) {
	return httpServices.get('categoryDetails?categoryId=' + id).then(resp => {
		if (resp.data) {
			return resp;
		}
	}).catch((error) => {
		console.log("error", error.resp);
	})
}

