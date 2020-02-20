import { httpServices } from "../services"


export const fetchOrderGraph = (Data) => {
    return httpServices.get('reports?flag=1&Id=' + Data.id + '&startDate=' + Data.startDate + '&regionId=' + Data.regionId).then(resp => {
        if (resp) {
            return resp
        }
    })
}
export const fetchOrderMap = (Data) => {
    return httpServices.get('reports?flag=0&Id=' + Data.id + '&startDate=' + Data.startDate + '&subregionId=' + Data.regionId + '&agentId=' + Data.agentId).then(resp => {
        if (resp) {
            return resp
        }
    })
}

export const getCustomerMapView = (Data) => {
    return httpServices.get('reports?Id=1&&flag=0&expiryDate=' + Data.expiryDate + '&startDate=' + Data.startDate + '&subregionId=' + Data.regionData).then(resp => {
        if (resp) {
            return resp
        }
    })
}

export const getCustomerGraphView = (Data) => {
    return httpServices.get('reports?Id=1&flag=1&expiryDate=' + Data.expiryDate + '&startDate=' + Data.startDate + '&regionId=' + Data.regionData).then(resp => {
        // localhost:8001/api/reports?Id=1&flag=1&regionId=1,2
        if (resp) {
            return resp
        }
    })
}

export const getSalesExecutiveGraphView = (Data) => {
    return httpServices.get('reports?Id=6&flag=0&expiryDate=' + Data.expiryDate + '&startDate=' + Data.startDate + '&subregionId=' + Data.regionData + '&agentId=' + Data.agentData).then(resp => {
        // localhost:8001/api/reports?Id=1&flag=1&regionId=1,2
        if (resp) {
            return resp
        }
    })
}

export const getPriceElasticityGraphView = (Data) => {
    return httpServices.get('reports?Id=5&flag=0&expiryDate=' + Data.expiryDate + '&startDate=' + Data.startDate + '&subregionId=' + Data.regionData + '&productId=' + Data.productId).then(resp => {
        // /reports?flag=0&Id=5&startDate=2020-02-14&expiryDate=2020-02-18&subregionId=DC93,DC87&productId=335,320,339
        if (resp) {
            return resp
        }
    })
}

export const getReportRegion = (obj) => {
    return httpServices.get('regionDcs?page=' + obj.page + '&rows=' + obj.rows).then(resp => {
        if (resp && resp.data) {
            // dispatch({ type: REGION_FETCH_SUCCESS, List: resp.data })
            return resp.data
        }
    }).catch((error) => {
        console.error("error", error);
        // dispatch({ type: GET_ERRORS, payload: error });
    })
}

export const getOrderValue = (Data) => {
    let report = Data.regionId && Data.regionId.length > 1 ? 'reports?flag=1&Id=3&regionId=' : 'reports?flag=0&Id=3&subregionId='
    let regionData = Data.regionId && Data.regionId.length > 1 ? Data.regionId : Data.subRegionId
    return httpServices.get(report + regionData + '&productId=' + Data.productId + '&startDate=' + Data.startDate + '&expiryDate=' + Data.expiryDate).then(resp => {
        if (resp && resp) {
            // dispatch({ type: REGION_FETCH_SUCCESS, List: resp.data })
            return resp
        }
    }).catch((error) => {
        console.error("error", error);
        // dispatch({ type: GET_ERRORS, payload: error });
    })
}
export const getTonValue = (Data) => {
    let report = Data.regionId && Data.regionId.length > 1 ? 'reports?flag=1&Id=4&regionId=' : 'reports?flag=0&Id=4&subregionId='
    let regionData = Data.regionId && Data.regionId.length > 1 ? Data.regionId : Data.subRegionId
    return httpServices.get(report + regionData + '&productId=' + Data.productId + '&startDate=' + Data.startDate + '&expiryDate=' + Data.expiryDate).then(resp => {
        if (resp && resp) {
            // dispatch({ type: REGION_FETCH_SUCCESS, List: resp.data })
            return resp
        }
    }).catch((error) => {
        console.error("error", error);
        // dispatch({ type: GET_ERRORS, payload: error });
    })
}

export const getProductList = (Data) => {
    return httpServices.get('products?dcCode=' + Data.dcCode).then(resp => {
        if (resp && resp.data) {
            // dispatch({ type: REGION_FETCH_SUCCESS, List: resp.data })
            return resp.data
        }
    }).catch((error) => {
        console.error("error", error);
        // dispatch({ type: GET_ERRORS, payload: error });
    })
}