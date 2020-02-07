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