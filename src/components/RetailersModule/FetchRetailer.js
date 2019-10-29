import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { fetchRetailers, deleteRetailer, updateStatusRetailer, getStateCity, getStateUsers } from '../../actions/SubmitRetailerAction';
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
import * as moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
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
            excelDatas: [],
            dateChanged: false,
            startDate: moment(),
            endDate: moment(),
        }
    }
    componentWillMount() {
        this.getRetailerList();
        this.getStateList();
    }
    componentDidUpdate(preProps) {
        if (preProps.searchText != this.props.searchText) {
            this.getRetailerList();
        }
    }
    getStateList() {
        let obj = {
            "countryId": 101
        }
        getStateCity({ obj }).then(resp => {
            this.setState({ stateData: resp && resp.data })
        })
    }
    handleInputChange = (e) => {
        let obj = {};
        if (e.target.name == "stateId" || e.target.name == "cityId") {
            if (e.target.name == "stateId") {
                this.setState({ cityData: [], cityId: 0 })
            }
            if (e.target.value) {
                this.setState({
                    [e.target.name]: e.target.value,
                }, () => {
                    this.getRetailerList();
                    obj = {
                        // "countryId": this.state.country,
                        "roleId": 2,
                        "countryId": 101,
                        "stateId": this.state.stateId,
                    }
                    if (this.state.stateId != 0) {
                        getStateCity(obj).then(resp => {
                            if (obj.countryId && obj.stateId) {
                                this.setState({ cityData: resp && resp.data })
                            } else {
                                this.setState({ stateData: resp && resp.data })
                            }
                        })
                    }
                    else {
                        this.setState({ cityData: [] })
                    }
                })
            }
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    getRetailerList = (status) => {
        const initialState = {};
        let user = {};
        user.roleId = 2;
        if (status == 'reset') {
            this.setState({
                cityData: [], startDate: moment(), endDate: moment(), dateChanged: false, cityId: 0, stateId: 0, StatusfilterId: 0
            })
        }
        else {
            if (this.state.stateId != 0) {
                user.state = this.state.stateId
            }
            if (this.state.cityId != 0) {
                user.city = this.state.cityId;
            }
            if (this.state.dateChanged) {
                user.startTime = this.state.startDate;
                user.endTime = this.state.endDate;
            }
            if (status) {
                user.status = status;
            }
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
                    this.getRetailerList();
                })
            },
            onCancel: () => this.getRetailerList()
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
    handleApply = (event, picker) => {
        this.setState({
            dateChanged: true,
            startDate: picker.startDate,
            endDate: picker.endDate,
        }, () => {
            this.getRetailerList()
        })
    }

    render() {
        let start = this.state.startDate.format('DD-MM-YYYY');
        let end = this.state.endDate.format('DD-MM-YYYY');
        let label = start + ' - ' + end;
        if (start === end) {
            label = '';
        }
        let excelDatas = [];
        const statusDropdown =
            resorceJSON.statusOptions.map((item, index) => {
                return <option value={index} className="drop-option"> {item}</option>
            })
        const stateDropDown = this.state.stateData && this.state.stateData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });
        const cityDropDown = this.state.cityData && this.state.cityData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });
        this.state.exceldatas && this.state.exceldatas.map((item, index) => {
            let address = '';
            let addressData = '';
            let role = '';
            let shopAddress = '';
            let shopAddressData = '';
            let selectBox = '';
            item.shopAddrss = item.shopAddress && item.shopAddress.address1 + ',' + item.shopAddress.address2;
            item.shopNames = item.shopAddress && item.shopAddress.name;
            item.shopAddressDataCountry = item.shopAddressData && item.shopAddressData.countrys && item.shopAddressData.countrys.name;
            item.shopAddressDataState = item.shopAddressData && item.shopAddressData.states && item.shopAddressData.states.name
            item.shopAddressDataCity = item.shopAddressData && item.shopAddressData.cities && item.shopAddressData.cities.name;

            item.created = moment(item.created).format("DD/MM/YYYY");
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
            item.address = address;
            item.role = role;
            item.shopAddress = shopAddress;
            excelDatas.push(item);
        })
        return (
            <div className="mt-4">
                <div className="main-filter">
                    <div className="date-range mr-2"><label className="label-title">Date:</label>
                        <DateRangePicker
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onApply={this.handleApply}
                        >  <div className="input-group">
                                <input type="text" className="form-control" value={label} />
                                <span className="input-group-btn">
                                    <Button className="default date-range-toggle">
                                        <i className="fa fa-calendar" />
                                    </Button>
                                </span>
                            </div>
                        </DateRangePicker>
                    </div>
                    <div className="state-filter mr-2"><label className="label-title">State:</label>
                        <select name="stateId" value={this.state.stateId} className="drop-select ml-1 yellow" onChange={this.handleInputChange}>
                            <option value="0">--Select State--</option>{stateDropDown}
                        </select>
                    </div>
                    <div className="city-filter"><label className="label-title">City:</label>
                        <select name="cityId" value={this.state.cityId} className="drop-select ml-1 red" onChange={this.handleInputChange}>
                            <option value="0">--Select City---</option>{cityDropDown}
                        </select>
                    </div>
                    <div className="status-filter  ml-1"><label className="label-title">Status Filter:</label>
                        <select name="StatusfilterId" value={this.state.StatusfilterId} className="drop-select ml-1 green" onChange={(e) => this.statusFilter(e)}>
                            <option value="0" className="drop-option">-- Select --</option>
                            {statusDropdown}
                        </select>
                    </div>
                    <div className="state-filter mr-2"><button type="button" className="reset ml-2" onClick={(e) => this.getRetailerList('reset')}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
                    </div>
                </div>
                <div className="sub-filter">
                    <ExportFile csvData={this.state.data} />
                    {/* <button onClick={(e) => this.excelExport(e)} className="excelExpBtn btn btn-primary mb-2">{window.strings.EXCELEXPORT}</button> */}
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
                    // handleDelete={this.handleDelete}
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
