import React from 'react'
import { CSVLink, CSVDownload } from "react-csv";

export default class ExportFile extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
        }
    }
    render() {
        // this.props.csvData && this.props.csvdatas.map((index, item) => {
        //     // delete index.addressKey
        //     // delete index.selectBox
        // });
        return (
            <CSVLink filename='Retailers.csv' className="excel-btn ml-2" data={this.props.csvData}>
                {window.strings.EXCELEXPORT}
            </CSVLink>
        )
    }
}
