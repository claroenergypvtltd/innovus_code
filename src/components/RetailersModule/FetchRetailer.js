import React from 'react';
import { Row, Col } from 'react-bootstrap';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { fetchRetailers, deleteRetailer, updateStatusRetailer } from '../../actions/SubmitRetailerAction';
import { RETAILER_DELETE_SUCCESS } from '../../constants/actionTypes';
import { connect } from 'react-redux';
import { resorceJSON } from '../../libraries';
import PropTypes from 'prop-types';
import { toastr } from '../../services/toastr.services'
import ExportFile from '../../shared/ExportFile';
// import GoogleMapPage from '../../shared/GoogleMapPage';
import { DynamicTable } from '../../../src/shared/DynamicTable'
import { path } from '../../constants';
import store from '../../store/store';

class FetchRetailer extends React.Component {
    static contextTypes = {
        router: PropTypes.object,
    };
    constructor(props, context) {
        super(props);
        this.state = {
            roleId: props.roleId,
            retailerId: "",
            columns: resorceJSON.RetailerList,
            data: [],
            products: {
                id: 1,
                name: "Product1",
                price: 120
            },
            csvData: [
                { firstname: "lastname" },
                { ee: "lastname" },
                { fi33rstname: "lastname" },
                { fir3323stname: "lastname" }
            ],
        }
    }
    componentWillMount() {
        this.getRetailerList();
    }
    getRetailerList = (status) => {
        let user = {};
        user.roleId = 2;
        if (status) {
            user.status = status;
        }
        user.search = this.props.searchText;
        this.props.fetchRetailers(user);
    };
    handlePageChange = e => {
        e.preventDefault();
        let redrctpath = path.retailer.add;
        this.context.router.history.push(redrctpath);
        // this.props.history.push(path.farmer.add);
    };
    componentWillReceiveProps(newProps) {
        if (newProps.list.datas) {
            let selectlist = newProps.list.datas;
            let Lists = selectlist && selectlist.map(item => {
                item.selectBox = this.viewCrop(item.id, item.status);
                return item;
            })
            this.setState({ data: Lists });
        }
        if (newProps.deletedData && newProps.deletedData == "200") {
            store.dispatch({ type: RETAILER_DELETE_SUCCESS, resp: "" })
            this.getRetailerList();
        }
    }
    viewCrop(RetstatusId, status) {
        const statusDropdown = resorceJSON.statusOptions.map((item, index) => {
            return <option value={index} selected={status == index ? true : false}>{item}</option>
        })
        let ViewPage = <select className="drop-select" onChange={(e) => this.statusChange(e, RetstatusId)}>
            {statusDropdown}
            {/* onChange={() => this.statusChange(RetstatusId)} selected={RetstatusId}*/}
            {/* <option value={status} className="drop-option" >{window.strings.RETAILERS.PENDING}</option>
            <option value={status} className="drop-option">{window.strings.RETAILERS.ACCEPTED}</option>
            <option value={status} className="drop-option">{window.strings.RETAILERS.REJECTED}</option> */}
        </select>
        return ViewPage;
    }
    statusChange(e, RetId) {
        let statusVal = e.target.value;
        console.log('----statusVal--', statusVal);
        let message = window.strings.UPDATEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => {
                const formData = new FormData();
                formData.append("userId", RetId);
                formData.append("roleId", 2);
                formData.append("status", statusVal);
                updateStatusRetailer(formData).then(resp => {
                    resp && resp.status == 200 ? toastr.success(resp.message) : toastr.failure(resp.message);
                })
            },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM);
    }
    statusFilter(e) {
        this.getRetailerList(e.target.value);

    }
    handleDelete = (data, e) => {
        e.preventDefault();
        let message = window.strings.DELETEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => { this.itemDelete(data.id) },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM);
    }
    itemDelete = (id) => {
        this.props.deleteRetailer(id)
    };
    excelExport(e) {
        e.preventDefault();
        console.log('----excelExport----');
    }
    // Actions() {
    //     let actions = <div>

    //         <button onClick={e => this.handleView(e)}>
    //             <i className="fa fa-eye" aria-hidden="true" />
    //         </button>


    //         <button onClick={(e) => this.handleEdit(e)}>
    //             <i className="fal fa-pencil-square-o edit_icon" />
    //         </button>


    //         <button onClick={(e) => this.handleDelete(e)}>
    //             <i className="fas fa-trash-alt" />
    //         </button>

    //     </div>
    //     return actions;
    // }
    // componentWillReceiveProps(newProps) {
    //     if (newProps.list) {
    //         let selectlist = newProps.list;
    //         let Lists = selectlist && selectlist.map(item => {
    //             // item.selectBox = this.viewCrop();
    //             //item.actions = this.Actions();
    //             return item;
    //         })
    //         this.setState({ data: Lists });
    //     }
    // }

    itemView = (e, item) => {
        let retailerId = item.id;
        this.context.router.history.push({
            pathname: path.retailer.view + retailerId,
            data: { farmerData: item },
        });
    };
    itemEdit = (Data) => {
        this.context.router.history.push({
            pathname: path.retailer.edit + Data.id,
            state: { retailerId: Data.id }
        })
    };
    render() {
        let excelDatas = [];
        const statusDropdown =
            resorceJSON.statusOptions.map((item, index) => {
                return <option value={index}> {item}</option>
            })
        this.state.data.map((item, index) => {
            if (item.shopAddress) {
                excelDatas.push(item.shopAddress)
            }
        })
        return (
            <div>
                <ExportFile csvData={this.state.data} />
                {/* <button onClick={(e) => this.excelExport(e)} className="excelExpBtn btn btn-primary mb-2">{window.strings.EXCELEXPORT}</button> */}
                <div className="statusFilter"><label>Status Filter:</label>&nbsp;
                    <select className="drop-select" onChange={(e) => this.statusFilter(e)}>
                        <option value="">-- Select --</option>
                        {statusDropdown}
                    </select>
                </div>
                {/* <Row className="clearfix title-section">
                    <Col md={5} className="title-card user-board">
                        <h4 className="user-title">{window.strings.USERMANAGEMENT.USER}</h4>
                    </Col>
                    <Col md={7} className="right-title row pr-0 pb-3">
                        <Col md={6} className="user-board add-user">
                            <i className="fa fa-search search-icon"></i><input type="text" className="search-btn" placeholder="Search.." />
                        </Col>
                        <Col md={3} className="user-board add-user">
                            <button type="submit" className="filter-btn"><i className="fa fa-filter filter-icon"></i>Filter by</button>
                        </Col>
                        <Col md={3} className="user-board add-user">
                            <button className="common-btn" onClick={this.handlePageChange} ><i className="fa fa-plus sub-plus"></i>{window.strings.USERMANAGEMENT.ADDRETAIL}
                            </button>
                        </Col>
                    </Col>

                </Row> */}
                {/* <DynamicTable tableDatas={this.state.data} tableHead={this.state.columns} handleEdit={this.itemEdit}
                    handleView={this.itemView}
                    handleDelete={this.itemDelete} /> */}
                <DataTableDynamic
                    title="Category List"
                    tableHead={this.state.columns}
                    tableDatas={this.state.data}
                    handleEdit={this.itemEdit}
                    handleView={this.itemView}
                    handleDelete={this.handleDelete}
                    pagination={true}
                />
                {/* <GoogleMapPage /> */}
            </div >
        );
    }
}

const mapStateToProps = state => ({
    list: state.retailer.Lists ? state.retailer.Lists : [],
    deletedData: state.retailer.deletedData
});

export default connect(
    mapStateToProps,
    { fetchRetailers, deleteRetailer },
)(FetchRetailer);
