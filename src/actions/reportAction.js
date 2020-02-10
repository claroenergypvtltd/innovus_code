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

// localhost:8001/api/reports?Id=6&startDate=2019-01-09&flag=0&expiryDate=2020-02-30&subregionId=DC81,DC02&agentId=S0141





// reports?Id=1&expiryDate=2020-01-10&startDate=2020-01-08&regionId=DC70