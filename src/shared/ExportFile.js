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
            excelitem.CustomerID = item.cusId && item.cusId === '-' ? '' : item.cusId;
            excelitem.ShopName = item.shopNames && item.shopNames === '-' ? '' : item.shopNames;
            excelitem.ShopAddress = item.shopAddrss1 && item.shopAddrss1 === '-' ? '' : item.shopAddrss1;
            excelitem.ShopLocalty = item.shopLocalty && item.shopLocalty === '-' ? '' : item.shopLocalty;
            excelitem.mobileNumber = item.mobileNumber && item.mobileNumber === '-' ? '' : item.mobileNumber;
            excelitem.shopType = item.shopType && item.shopType === '-' ? '' : item.shopType;
            excelitem.AgentName = item.agentName && item.agentName === '-' ? '' : item.agentName;
            PrintexcelDatas.push(excelitem);
        });
        return (
            <CSVLink filename='Retailers.csv' className="excel-btn export-file ml-2" data={PrintexcelDatas} >
                {window.strings.EXCELEXPORT}
                <span className="tooltip-text">Export</span>
            </CSVLink>
            // <span className="tooltip-text">Export</span>
        )
    }
}
