import { httpServices } from "../services"


export const fetchReportGraph = (Data) => {
    return httpServices.get('reports?Id=' + Data.id + '&startDate=' + Data.startDate + '&regionId' + Data.regionId).then(resp => {
        if (resp) {
            return resp
        }
    })
}

export const fetchReportMap = (Data) => {
    return httpServices.get().then(resp => {
        if (resp) {
            return resp
        }
    })
}