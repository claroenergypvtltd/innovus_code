import React from 'react';
import DataTable from 'react-data-table-component';

class DataTableDynamic extends React.Component {
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
              <button onClick={e => this.handleView(e, row)}>
                <i className="fa fa-eye" aria-hidden="true" />
              </button>
            )}
            {this.props.handleEdit && (
              <button onClick={() => this.handleEdit(row)}>
                <i className="fal fa-pencil-square-o edit_icon" />
              </button>
            )}
            {this.props.handleDelete && (
              <button onClick={() => this.handleDelete(row)}>
                <i className="fas fa-trash-alt" />
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

  handleEdit(row) {
    this.props.handleEdit();
  }
  handleView(e, row) {
    console.log('row', row);
    this.props.handleView(e, row);
  }
  handleDelete(row) {
    this.props.handleDelete(row);
  }
  render() {
    let tableHeader = this.state.tableHead;
    let tableDatas = this.props.tableDatas;
    console.log('tableDatas', tableDatas);
    return (
      <div>
        <DataTable
          columns={tableHeader}
          data={tableDatas}
          pagination={this.props.pagination}
          expandableRows={this.props.expandable}
          expandableRowsComponent={this.props.expandableComponent}
        />
      </div>
    );
  }
}

export default DataTableDynamic;
