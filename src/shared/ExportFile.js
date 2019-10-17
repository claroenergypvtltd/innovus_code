import React from 'react'
import { CSVLink, CSVDownload } from "react-csv";

export default class ExportFile extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
        }
    }
    render() {
        // const csvData = [
        //     ["firstname", "lastname", "email"],
        //     ["Ahmed", "Tomi", "ah@smthing.co.com"],
        //     ["Raed", "Labes", "rl@smthing.co.com"],
        //     ["Yezzi", "Min l3b", "ymin@cocococo.com"]
        // ];

        return (
            <CSVLink className="excelExpBtn btn btn-primary mb-2" data={this.props.csvData}>
                {window.strings.EXCELEXPORT}
            </CSVLink>
        )
    }
}
