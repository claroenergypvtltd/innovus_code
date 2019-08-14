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
            <button onClick={() => this.handleView(row)}>
              <i className="fal fa-eye" />
            </button>
            <button onClick={() => this.handleEdit(row)}>
              <i className="fal fa-edit" />
            </button>
            <button onClick={() => this.handleDelete(row)}>
              <i className="fas fa-trash-alt" />
            </button>
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
  handleView(row) {
    this.props.handleView();
  }
  handleDelete(row) {
    this.props.handleDelete(row);
  }

  render() {
    let tableHeader = this.state.tableHead;
    let tableDatas = this.props.tableDatas;
    return (
      <div>
        <DataTable columns={tableHeader} data={tableDatas} pagination />
      </div>
    );
  }
}

export default DataTableDynamic;
