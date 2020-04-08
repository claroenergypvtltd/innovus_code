import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

export class DynamicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: [],
            tableDatas: [],
        };
    }
    componentDidMount() {
        let buttonActions = [
            {
                name: 'Actions',
                cell: row => (
                    <div>
                        {this.props.handleView && (
                            <button onClick={e => this.handleView(e, row)} className="btn-view">
                                <i className="fa fa-eye" aria-hidden="true" />
                                <span className="tooltip-text">View</span>

                            </button>
                        )}
                        {this.props.handleEdit && (
                            <button onClick={(e) => this.handleEdit(e, row)} className="btn-edit">
                                <i className="fal fa-pencil-square-o" />
                                <span className="tooltip-text">Edit</span>

                            </button>
                        )}
                        {this.props.handleDelete && (
                            <button onClick={(e) => this.handleDelete(row, e)} className="btn-trash">
                                <i className="fas fa-trash" />
                                <span className="tooltip-text">Delete</span>
                            </button>
                        )}
                    </div>
                ),
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
        ];
        if (this.props.tableHead) {
            let datasAndButtons = this.props.tableHead.concat(buttonActions);
            this.setState({ tableHead: datasAndButtons });
        }
    }

    handleEdit(e, row) {
        console.log('rowrowrow', row);
        this.props.handleEdit(e, row);
    }
    handleView(e, row) {
        this.props.handleView(e, row);
    }
    handleDelete(row, e) {
        console.log('row', row);
        this.props.handleDelete(row, e);
    }
    render() {
        const { SearchBar } = Search;
        let tableHeader = this.state.tableHead;
        let tableDatas = this.props.tableDatas;
        console.log('tableDatas', tableDatas);
        console.log('----this.props.tableDatas----', this.props.tableDatas);
        console.log('----tableHeader----', tableHeader);
        return (
            <ToolkitProvider
                keyField="id"
                data={this.props.tableDatas}
                columns={this.props.tableHead}
                search={this.props.tableDatas} >
                {props => (
                    <div>
                        <h3>Input something at below input field:</h3>
                        <SearchBar {...props.tableDatas} />
                        <hr />
                        <BootstrapTable keyField='id' data={tableDatas} columns={this.props.tableHead} pagination={paginationFactory()}
                        />
                    </div>
                )
                }
            </ToolkitProvider>
        );

    }
}



