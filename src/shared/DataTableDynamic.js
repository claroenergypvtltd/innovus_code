import React from 'react';
import DataTable from 'react-data-table-component';

class DataTableDynamic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [],
      tableDatas: [],
      toggledClearRows: true
    };
  }
  handleClearRows = () => {
    this.setState({ toggledClearRows: !this.state.toggledClearRows })
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
              <button onClick={() => this.handleEdit(row)} className="btn-edit">
                {/* <i className="fal fa-pencil-square-o edit_icon" />*/}
                <i className="fa fa-pencil-square-o" />
                <span className="tooltip-text">Edit</span>
              </button>
            )}
            {this.props.handleDelete && (
              <button onClick={e => this.handleDelete(row, e)} className="btn-trash">
                <i className="fa fa-trash" />
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
      let datasAndButtons;
      if (this.props.orderReceivedpage) {
        datasAndButtons = this.props.tableHead
      } else {
        datasAndButtons = this.props.tableHead.concat(buttonActions);
      }
      this.setState({ tableHead: datasAndButtons });
    }
  }

  handleEdit(row) {
    console.log(row);
    this.props.handleEdit(row);
  }
  handleView(e, row) {

    this.props.handleView(e, row);
  }
  handleDelete(row, e) {
    this.props.handleDelete(row, e);
  }
  expandableComponent(e, row) {
    console.log('row', row);
    this.props.expandableComponent(row);
    // this.props.handleEdit(row);
  }

  handleRowChange = (row) => {
    this.setState({ toggledClearRows: this.state.toggledClearRows }, () => {
      this.props && this.props.handleRowChange && this.props.handleRowChange(row.selectedRows);

    })
  }


  render() {
    let tableHeader = this.state.tableHead;
    let tableDatas = this.props.tableDatas;
    let tableCss;
    const myNewTheme = {
      rows: {
        fontSize: '15px',
        color: '#9E9E9E!important',
        background: 'red'
      }
    }

    let selectableRows = false;
    if (this.props && this.props.handleRowChange) {
      selectableRows = true
    }
    return (
      <div className="tables">
        <DataTable className={this.props && this.props.customCss ? 'fetchretailertbl' : 'crop-table'}
          noHeader={true}
          data={tableDatas}
          columns={tableHeader}
          data={tableDatas}
          pagination={this.props.pagination}
          expandableRows={this.props.expandable}
          expandableRowsComponent={this.props.expandableComponent}
          paginationRowsPerPageOptions={[10, 25, 50]}
          customTheme={myNewTheme}
          selectableRows={true}
          onRowSelected={this.handleRowChange}
          striped={true}
          clearSelectedRows={this.state.toggledClearRows}
        // selectableRowsPreSelectedField={false}
        />
      </div>
    );
  }
}

export default DataTableDynamic;
