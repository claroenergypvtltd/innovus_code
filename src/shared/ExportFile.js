import React from 'react'
import { CSVLink, CSVDownload } from "react-csv";

export default class ExportFile extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <CSVLink filename='Retailers.csv' className="excel-btn" data={this.props.csvData}>
                {window.strings.EXCELEXPORT}
            </CSVLink>
        )
    }
}
