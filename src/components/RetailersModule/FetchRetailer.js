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
            excelDatas: []
        }
    }
    componentWillMount() {
        this.getRetailerList();
    }

    componentDidUpdate(preProps) {
        if (preProps.searchText != this.props.searchText) {
            this.getRetailerList();
        }
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
    };
    componentWillReceiveProps(newProps) {
        if (newProps.list.datas) {
            let selectlist = newProps.list.datas;
            let Lists = selectlist && selectlist.map(item => {
                item.selectBox = this.viewCrop(item.id, item.status);
                return item;
            })
            this.setState({
                data: Lists, exceldatas: Lists
            })

        }
        if (newProps.deletedData && newProps.deletedData == "200") {
            store.dispatch({ type: RETAILER_DELETE_SUCCESS, resp: "" })
            this.getRetailerList();
        }
    }
    viewCrop(RetstatusId, status) {
        let statusClass;
        if (status == 0) {
            statusClass = window.strings.RETAILERS.PENDING
        } else if (status == 1) {
            statusClass = window.strings.RETAILERS.ACCEPTED
        } else {
            statusClass = window.strings.RETAILERS.REJECTED
        }
        const statusDropdown = resorceJSON.statusOptions.map((item, index) => {
            return <option value={index} selected={status == index ? true : false} className="drop-option">{item}</option>
        })
        let ViewPage = <select className={statusClass} onChange={(e) => this.statusChange(e, RetstatusId)}>
            {/* className="drop-select" */}
            {statusDropdown}
        </select >
        return ViewPage;
    }
    statusChange(e, RetId) {
        let statusVal = e.target.value;
        let message = window.strings.UPDATEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => {
                const formData = new FormData();
                formData.append("userId", RetId);
                formData.append("roleId", 2);
                formData.append("status", statusVal);
                updateStatusRetailer(formData).then(resp => {
                    resp && resp.status == 200 ? toastr.success(resp.message) : toastr.failure(resp.message);
                    window.location.reload(false);
                })
            },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.UPDATERETSTATUS);
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
            data: { farmerData: item, retailerId: retailerId },
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
                return <option value={index} className="drop-option"> {item}</option>
            })
        this.state.exceldatas && this.state.exceldatas.map((item, index) => {
            let address = '';
            let addressData = '';
            let role = '';
            let shopAddress = '';
            let shopAddressData = '';
            let selectBox = '';
            if (Object.keys(item.address).length > 1) {
                address = JSON.stringify(item.address).toString().replace(/"/g, '');
            }
            if (Object.keys(item.addressData).length > 1) {
                addressData = JSON.stringify(item.addressData).toString().replace(/"/g, '');
            }
            if (Object.keys(item.role).length > 1) {
                role = JSON.stringify(item.role).toString().replace(/"/g, '');
            }
            if (Object.keys(item.shopAddress).length > 1) {
                shopAddress = JSON.stringify(item.shopAddress).toString().replace(/"/g, '');
            }
            // if (Object.keys(item.shopAddressData).length > 1) {
            //      shopAddressData = JSON.stringify(item.shopAddressData).toString().replace(/"/g, '');
            // }
            item.jsonaddress = item.address;
            item.jsonshopAddress = item.shopAddress;
            item.address = address;
            // item.addressData = addressData;
            item.role = role;
            item.shopAddress = shopAddress;
            // item.shopAddressData = shopAddressData;
            excelDatas.push(item);
            console.log('excelDatas---', excelDatas);

        })
        return (
            <div className="mt-4">
                <div className="main-filter">
                    <div className="date-range mr-2"><label className="label-title">Date:</label>
                        <input type="text" name="date" className="date-box ml-1" />
                    </div>
                    <div className="new-filter mr-2"><label className="label-title">State:</label>
                        <select className="drop-select ml-1 yellow" onChange={(e) => this.statusFilter(e)}>
                            <option value="" className="drop-option">-- Select --</option>
                            <option value="" className="drop-option">Tamil Nadu</option>
                            <option value="" className="drop-option">Kerala</option>

                        </select>
                    </div>
                    <div className="sub-filter"><label className="label-title">City:</label>
                        <select className="drop-select ml-1 red" onChange={(e) => this.statusFilter(e)}>
                            <option value="" className="drop-option">-- Select --</option>
                            <option value="" className="drop-option">Madurai</option>
                            <option value="" className="drop-option">Kochi</option>
                        </select>
                    </div>
                </div>
                <div className="sub-filter">
                    <ExportFile csvData={this.state.data} />
                    {/* <button onClick={(e) => this.excelExport(e)} className="excelExpBtn btn btn-primary mb-2">{window.strings.EXCELEXPORT}</button> */}
                    <div className="status-filter"><label className="label-title">Status Filter:</label>
                        <select className="drop-select ml-1 green" onChange={(e) => this.statusFilter(e)}>
                            <option value="" className="drop-option">-- Select --</option>
                            {statusDropdown}
                        </select>
                    </div>
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
