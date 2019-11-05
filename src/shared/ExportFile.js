import React from 'react'
import { CSVLink, CSVDownload } from "react-csv";

export default class ExportFile extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
        }
    }
    render() {
        let PrintexcelDatas = [];
        this.props.csvData && this.props.csvData.map((item, index) => {
            let excelitem = {};
            if (item.status == 0) {
                excelitem.Status = "Pending";
            }
            else if (item.status == 1) {
                excelitem.Status = "Accepted";
            }
            else if (item.status == 2) {
                excelitem.Status = "Rejected";
            }
            excelitem.OnboardedDate = item.created;
            excelitem.CustomerID = item.cusId;
            excelitem.ShopName = item.shopNames;
            excelitem.AgentName = item.agentName;
            excelitem.ShopAddress = item.fullShopAddrss;
            PrintexcelDatas.push(excelitem);
        });
        return (
            <CSVLink filename='Retailers.csv' className="excel-btn ml-2" data={PrintexcelDatas} >
                {window.strings.EXCELEXPORT}
            </CSVLink>
        )
    }
}
