import { httpServices } from "../services"


export const fetchOrderGraph = (Data) => {
    return httpServices.get('reports?Id=' + Data.id + '&startDate=' + Data.startDate + '&regionId=' + Data.regionId).then(resp => {
        if (resp) {
            return resp
        }
    })
}
export const fetchOrderMap = (Data) => {
    return httpServices.get('reports?Id=' + Data.id + '&startDate=' + Data.startDate + '&regionId=' + Data.regionId).then(resp => {
        if (resp) {
            return resp
        }
    })
}

export const getCustomerMapView = (Data) => {
    return httpServices.get('reports?ID=2&expiryDate=' + Data.expiryDate + '&startDate=' + Data.startDate + '&regionId=' + Data.regionData).then(resp => {
        if (resp) {
            return resp
        }
    })
}

// reports?Id=1&expiryDate=2020-01-10&startDate=2020-01-08&regionId=DC70