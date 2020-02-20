import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../constants/actionTypes';
import { endPoint } from "../constants";

export const getParentCategoryList = (Data) => dispatch => {

	let search = ""; let page = ""; let rows = "";
	if (Data) {
		search = Data.search ? "&search=" + Data.search : '';
		page = (Data.page || Data.page == 0) ? "pages=" + Data.page : '';
		rows = Data.limit ? "&rows=" + Data.limit : '';
	}

	httpServices.get(endPoint.mCategory + "?" + page + rows + search).then(resp => {

		if (resp && resp.data) {
			dispatch({ type: CATEGORY_FETCH_SUCCESS, List: resp.data, count: resp.data.totalCount })
		} else {
			console.error("Error when getting CategoryList");
		}
	}).catch((error) => {
		console.error("error", error);
	})
}

export const getCategoryList = (Data) => dispatch => {

	let search = ""; let page = ""; let rows = ""; let parentCategoryId = "";
	if (Data) {
		search = Data.search ? "&search=" + Data.search : '';
		page = (Data.page || Data.page == 0) ? "pages=" + Data.page : '';
		rows = Data.limit ? "&rows=" + Data.limit : '';
		parentCategoryId = Data.parentCategoryId ? "&mCategoryId=" + Data.parentCategoryId : '';
	}

	httpServices.get(endPoint.category + "?" + page + rows + search + parentCategoryId).then(resp => {

		if (resp && resp.data) {
			dispatch({ type: CATEGORY_FETCH_SUCCESS, List: resp.data, count: resp.data.totalCount })
		} else {
			console.error("Error when getting CategoryList");
		}
	}).catch((error) => {
		console.error("error", error);
	})
}


export const SubmitCategory = (category, Id, isProduct) => dispatch => {

	let apiHeader;
	if (isProduct == "isProduct") {
		apiHeader = endPoint.products
	} else {
		apiHeader = endPoint.category
	}


	if (Id) {  // Check whether the Id is empty or not then respectively hit Add and Update
		httpServices.put(apiHeader, category).then(resp => {
			if (resp) {
				resp.message && toastr.success(resp.message);
				dispatch({ type: CATEGORY_UPDATE_SUCCESS, resp: resp.status })
			}
		}).catch((error) => {
			console.error("error", error);
			dispatch({ type: CATEGORY_CREATE_SUCCESS, resp: error.status })
		})

	} else {
		httpServices.post(apiHeader, category).then(resp => {
			if (resp) {
				resp.message && toastr.success(resp.message);
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
	let rows = ''; let page = ''; let searchData = ''; let dcCode = ""; let parentCategoryId = "";
	if (Data && Data.limit) {
		page = (Data.page || Data.page == 0) ? '&page=' + Data.page : '';
		rows = Data.limit ? '&rows=' + Data.limit : '';
		searchData = Data.search ? '&search=' + Data.search : '';
		dcCode = Data.dcCode ? '&dcCode=' + Data.dcCode : '';
		parentCategoryId = Data.parentCategoryId ? '&mCategoryId=' + Data.parentCategoryId : '';
	}
	let headerName;
	if (Data.name == "subCategory") {
		headerName = endPoint.products
	} else {
		headerName = endPoint.category
	}
	httpServices.get(headerName + '?' + IdText + '=' + Data.categoryId + parentCategoryId + searchData + page + rows + dcCode).then(resp => {
		if (resp.data) {
			dispatch({ type: CATEGORY_SPECIFIC_DATA_SUCCESS, resp })
		} else {
			dispatch({ type: CATEGORY_SPECIFIC_DATA_SUCCESS, resp: [] })
		}
	}).catch((error) => {
		dispatch({ type: CATEGORY_SPECIFIC_DATA_SUCCESS, resp: [] })
		console.error("error", error.resp);
	})
}

export const getCategoryDCCode = (dcCode, dcsubcat, type) => {
	let dCCode = '';
	let headerName;
	if (type == 'getDcsubCat') {
		dCCode = '?categoryId=' + dcCode + '&dcCode=' + dcsubcat;
	}
	else {
		dCCode = '?parentId=' + dcCode
	}
	return httpServices.get(endPoint.products + dCCode).then(resp => {

		if (resp.data) {
			return resp
			// dispatch({ type: CATEGORY_SPECIFIC_DATA_SUCCESS, resp })
		}
	}).catch((error) => {
		console.error("error", error.resp);
	})
}

