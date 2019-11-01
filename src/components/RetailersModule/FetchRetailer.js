import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { fetchRetailers, deleteRetailer, updateStatusRetailer, getStateCity, getStateUsers } from '../../actions/SubmitRetailerAction';
import { fetchSalesAgent } from '../../actions/salesAgentAction';
import { RETAILER_DELETE_SUCCESS } from '../../constants/actionTypes';
import { connect } from 'react-redux';
import { resorceJSON, ModalData } from '../../libraries';
import PropTypes from 'prop-types';
import { toastr } from '../../services/toastr.services'
import ExportFile from '../../shared/ExportFile';
// import GoogleMapPage from '../../shared/GoogleMapPage';
import { DynamicTable } from '../../../src/shared/DynamicTable'
import { path } from '../../constants';
import store from '../../store/store';
import * as moment from 'moment';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import TransferAgent from './TransferAgent'
import { SearchBar } from '../../shared'

class FetchRetailer extends React.Component {
    static contextTypes = {
        router: PropTypes.object,
    };
    constructor(props, context) {

        super(props);
        this.state = {
            roleId: props.roleId,
            retailerId: "",
            search: '',
            columns: resorceJSON.RetailerList,
            data: [],
            excelDatas: [],
            dateChanged: false,
            startDate: moment(),
            endDate: moment(),
            selectedDatas: [],
            advanceSearch: false
        }
    }
    componentWillMount() {
        this.getRetailerList();
        this.getStateList();
        this.fetchAgents();
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
    handleStateChange = (e) => {
        let obj = {};
        if (e.name == "stateId" || e.name == "cityId") {
            if (e.name == "stateId") {
                this.setState({ selectedStateOption: e, cityData: [], cityId: 0, selectedCityOption: '' })
            }
            if (e.name == "cityId") {
                this.setState({ selectedCityOption: e })
            }
            if (e.value) {
                this.setState({
                    [e.name]: e.value,
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
                [e.name]: e.target.value
            })
        }
    };

    handleAgentChange = (e) => {
        this.setState({ selectedAgentOption: e, agentId: e.value }, () => { this.getRetailerList() })

    };
    getRetailerList = (status) => {
        const initialState = {};
        let user = {};
        user.roleId = 2;
        user.search = this.state.search;
        if (status == 'reset') {
            this.setState({
                cityData: [], startDate: moment(), endDate: moment(), dateChanged: false, cityId: 0, stateId: 0, StatusfilterId: 0, selectedCityOption: '', selectedStateOption: '', selectedAgentOption: '', agentId: ''
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
            if (this.state.agentId) {
                user.agentId = this.state.agentId;
            }
        }
        this.props.fetchRetailers(user);

    };
    fetchAgents = () => {
        let user = {};
        user.roleId = 4;
        this.props.fetchSalesAgent(user);
    }
    handlePageChange = e => {
        e.preventDefault();
        let redrctpath = path.retailer.add;
        this.context.router.history.push(redrctpath);
    };
    componentWillReceiveProps(newProps) {
        if (newProps.list.datas) {
            let selectlist = newProps.list.datas;
            let agentDataList = newProps.agentData;
            let Lists = selectlist && selectlist.map(item => {
                item.selectBox = this.viewCrop(item.id, item.status);
                return item;
            })
            this.setState({
                data: Lists, exceldatas: Lists, agentDataList: agentDataList.Lists.datas
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
        let ViewPage = <p className={statusClass} >{statusClass}</p>
        // const statusDropdown = resorceJSON.statusOptions.map((item, index) => {
        //     return <option value={index} selected={status == index ? true : false} className="drop-option">{item}</option>
        // })
        // let ViewPage = <select className={statusClass} onChange={(e) => this.statusChange(e, RetstatusId)}>
        //     {/* className="drop-select" */}
        //     {statusDropdown}
        // </select >
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
                    // resp && resp.status == 200 ? toastr.success(resp.message) : toastr.failure(resp.message);
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

    handleRowChange = (Data) => {
        this.setState({ selectedDatas: Data })
    }

    onCloseModal = () => {
        this.getRetailerList();
        this.setState({ open: false });
    };

    onOpenModal = (e) => {
        e.preventDefault();
        if (this.state.selectedDatas && this.state.selectedDatas.length > 0) {
            this.setState({ open: true });
        } else {
            toastr.error("Please Select any Customer");
        }
    };

    enableAdvanceSearch = (e) => {
        e.preventDefault();
        let enableSearch = this.state.advanceSearch ? false : true
        this.setState({ advanceSearch: enableSearch })
    }
    searchResult = (e) => {

        e.preventDefault();
        if (this.state.search) {
            // let serObj = {
            // "search": this.state.search
            // };
            this.getRetailerList();
        }
    }

    resetSearch = () => {
        if (this.state.search) {
            this.setState({ search: '' }, () => {
                this.getRetailerList();
            });
        }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    render() {
        let start = this.state.startDate.format('DD-MM-YYYY');
        let end = this.state.endDate.format('DD-MM-YYYY');
        let label = start + ' - ' + end;
        if (start === end) {
            label = '';
        }
        let excelDatas = [];
        let stateDropDown = []; let cityDropDown = []; let agentListDropDown = [];
        const statusDropdown =
            resorceJSON.statusOptions.map((item, index) => {
                return <option value={index} className="drop-option"> {item}</option>
            })
        this.state.agentDataList && this.state.agentDataList.map((item) => {
            let obj = { "label": item.agentName, "value": item.agentId, "name": "agentName" };
            agentListDropDown.push(obj);
        })
        this.state.stateData && this.state.stateData.map((item) => {
            let obj = { "label": item.name, "value": item.id, "name": "stateId" };
            stateDropDown.push(obj);
        })
        this.state.cityData && this.state.cityData.map((item) => {
            let obj = { "label": item.name, "value": item.id, "name": "cityId" };
            cityDropDown.push(obj);
        })

        // const stateDropDown = this.state.stateData && this.state.stateData.map((item, index) => {
        //     return <option key={index}
        //         value={item.id} className="drop-option"> {item.name}</option>
        // });
        // const cityDropDown = this.state.cityData && this.state.cityData.map((item, index) => {
        //     return <option key={index}
        //         value={item.id} className="drop-option"> {item.name}</option>
        // });
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
            item.fullShopAddrss = item.shopAddrss + item.shopAddressDataCity + item.shopAddressDataState + ',' + item.shopAddressDataCountry + '.';
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

        let TransferAgentData = < TransferAgent onCloseModal={this.onCloseModal} selectedDatas={this.state.selectedDatas} />

        return (
            <div className=" mt-4">
                <div className="d-flex justify-content-end">
                    <SearchBar className="Retailersearch" SearchDetails={{ filterText: this.state.search, onChange: this.handleSearch, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                    <div className="retail-reset">
                        <button type="button" className="reset ml-2" onClick={(e) => this.getRetailerList('reset')}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
                    </div>
                    <button className="advance-search" onClick={this.enableAdvanceSearch} ><span className="advance-icon"></span>Advance Search</button>
                    <ExportFile className="export-search" csvData={this.state.data} />
                </div>
                <div id="menu">
                    {/* <button className="advance-search"><span className="advance-icon"></span></button> */}


                    <div className="assign-box">
                        <button className="assign-btn" onClick={this.onOpenModal} ><i className="fa fa-plus sub-plus"></i>
                            {window.strings.USERMANAGEMENT.ASSIGN_TRANSFER_AGENT}
                        </button>
                    </div>
                    {/* <div className="main-filter d-flex justify-content-end">
                    <div className="row">
                        {/* <SearchBar className="Retailersearch" SearchDetails={{ filterText: this.state.search, onChange: this.handleSearch, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                        <ExportFile className="col-md-6" csvData={this.state.data} /> 
                    </div>
                </div> */}
                    {this.state.advanceSearch &&
                        <div className="">
                            <div className="main-filter">
                                <div className="row">
                                    <div className="col-md-4 date-range"><label className="label-title">Date:</label>
                                        <DateRangePicker
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            onApply={this.handleApply}
                                        >  <div className="date-box">
                                                <input type="text" className="form-control date-form ml-1" value={label} />
                                                <span className="date-group">
                                                    <button className="date-btn">
                                                        <i className="fa fa-calendar" />
                                                    </button>
                                                </span>
                                            </div>
                                        </DateRangePicker>
                                    </div>

                                    <div className="col-md-4 state-filter"><label className="label-title">State:</label>
                                        {/* <ReactMultiSelectCheckboxes options={dropDownData} onChange={this.checkbox} /> */}
                                        <Select className="state-box ml-1"
                                            value={this.state.selectedStateOption}
                                            onChange={(e) => this.handleStateChange(e)}
                                            options={stateDropDown}
                                            placeholder="--Select State--"
                                        />

                                        {/* <select name="stateId" value={this.state.stateId} className="state-select ml-1 yellow" onChange={this.handleInputChange}>
                                <option value="0" className="drop-option">--Select State--</option>{stateDropDown}
                            </select> */}
                                    </div>
                                    {/* <div className="col-md-4 state-filter"><label className="label-title">State:</label>
                                    <select name="stateId" value={this.state.stateId} className="state-select ml-1 yellow" onChange={this.handleInputChange}>
                                        <option value="0" className="drop-option">--Select State--</option>{stateDropDown}
                                    </select>
                                </div> */}

                                    <div className="col-md-4 city-filter"><label className="label-title">City:</label>
                                        {/* <select name="cityId" value={this.state.cityId} className="city-select ml-1 red" onChange={this.handleInputChange}>
                                <option value="0" className="drop-option">--Select City---</option>{cityDropDown}
                            </select> */}
                                        <Select className="city-box ml-1"
                                            value={this.state.selectedCityOption}
                                            onChange={(e) => this.handleStateChange(e)}
                                            options={cityDropDown}
                                            placeholder="--Select City--"
                                        />
                                    </div>
                                    {/* <div className="col-md-4 city-filter"><label className="label-title">City:</label>
                                    <select name="cityId" value={this.state.cityId} className="city-select ml-1 red" onChange={this.handleInputChange}>
                                        <option value="0" className="drop-option">--Select City---</option>{cityDropDown}
                                    </select>
                                </div> */}

                                    {/* <div className="col-md-2 status-filter"><label className="label-title">Status:</label>
                                    <select name="StatusfilterId" value={this.state.StatusfilterId} className="drop-select ml-1 green" onChange={(e) => this.statusFilter(e)}>
                                        <option value="0" className="drop-option">-- Select --</option>
                                        {statusDropdown}
                                    </select>
                                </div> */}
                                </div>
                            </div >
                            <div className="sub-filter">
                                <div className="row ">
                                    <div className="col-md-3 agent-filter"><label className="label-title">Agent:</label>
                                        <Select
                                            className="city-box ml-1"
                                            value={this.state.selectedAgentOption}
                                            onChange={(e) => this.handleAgentChange(e)}
                                            options={agentListDropDown}
                                            placeholder="--Select Agent--"
                                        />

                                    </div>
                                    <div className="col-md-5 status-filter"><label className="label-title">Status:</label>
                                        <select name="StatusfilterId" value={this.state.StatusfilterId} className="drop-select ml-1 green" onChange={(e) => this.statusFilter(e)}>
                                            <option value="0" className="drop-option">-- Select --</option>
                                            {statusDropdown}
                                        </select>
                                    </div>
                                    {/* <div className="">
                                <button type="button" className="reset ml-2" onClick={(e) => this.getRetailerList('reset')}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
                            </div> */}
                                </div></div>
                        </div>}
                    <DataTableDynamic
                        title="Category List"
                        tableHead={this.state.columns}
                        tableDatas={this.state.data}
                        // handleEdit={this.itemEdit}
                        handleView={this.itemView}
                        // handleDelete={this.handleDelete}
                        pagination={true}
                        checkbox={true}
                        onRowSelected={this.handleRowChange}
                        handleRowChange={this.handleRowChange}
                    />
                    <ModalData show={this.state.open} onHide={this.onCloseModal} modalData={TransferAgentData} ModalTitle="Update Agent" />

                    {/* <GoogleMapPage /> */}
                </div></div>
        );
    }
}

const mapStateToProps = state => ({
    list: state.retailer.Lists ? state.retailer.Lists : [],
    deletedData: state.retailer.deletedData,
    agentData: state.salesAgent
});

export default connect(
    mapStateToProps,
    { fetchRetailers, deleteRetailer, fetchSalesAgent },
)(FetchRetailer);
