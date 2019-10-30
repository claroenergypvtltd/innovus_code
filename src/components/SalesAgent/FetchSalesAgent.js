import React, { Component } from 'react';
import { TableData } from '../../shared/Table'


export default class FetchSalesAgent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Created ON", "Agent ID", "Agent Name", "Phone Number", "Actions"],


        }
    }

    render() {
        return (
            <div>
                <TableData TableHead={this.state.TableHead} handleEdit={this.itemEdit}
                />
            </div>
        )
    }

}