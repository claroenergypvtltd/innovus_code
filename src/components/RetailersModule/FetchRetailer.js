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
import { SearchBar, ReactPagination } from '../../shared'
import { getDcCodeData } from '../../actions/salesAgentAction';


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
            advanceSearch: false,
            popup: false,
            dcCode: '',
            clearCheck: true,
            currentPage: 0,
            itemPerPage: 5,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
            filterWithPagination: true
        }
    }
    componentWillMount() {
        if (this.context.router.route.location.state && this.context.router.route.location.state.retlrbckTrack == "backTrue" && sessionStorage.retsearchDatas) {
            var sessRetsearchDatas = JSON.parse(sessionStorage.retsearchDatas);
            if (sessRetsearchDatas) {
                this.setState({
                    search: sessRetsearchDatas.search,
                    dcCode: sessRetsearchDatas.dcCode,
                    stateId: sessRetsearchDatas.state,
                    cityId: sessRetsearchDatas.city,
                    StatusfilterId: sessRetsearchDatas.status,
                    agentId: sessRetsearchDatas.agentId,
                    selectedAgentOption: sessRetsearchDatas.selectedAgentOption,
                    selectedStateOption: sessRetsearchDatas.selectedStateOption,
                    selectedCityOption: sessRetsearchDatas.selectedCityOption,
                    dcCodeObj: sessRetsearchDatas.dcCodeObj,
                    advanceSearch: false,
                    currentPage: sessRetsearchDatas.pages
                }, () => {
                    this.callAllUserAPis();
                    this.enableAdvanceSearch();
                });
            }
        } else {
            this.callAllUserAPis();
        }
    }
    componentWillReceiveProps(newProps) {
        //         var routeChanged = newProps.location !== this.props.location
        // console.log('---routeChanged---',routeChanged)
        if (newProps.list.datas && !this.state.popup) {
            let selectlist = newProps.list.datas;
            // let agentDataList = newProps.agentData;
            let Lists = selectlist && selectlist.map(item => {
                item.selectBox = this.viewCrop(item.id, item.status, item.isActive);
                return item;
            })
            this.setState({
                data: Lists, exceldatas: Lists, pageCount: newProps.list.totalCount / this.state.itemPerPage
            })
        }
        if (newProps.deletedData && newProps.deletedData == "200") {
            store.dispatch({ type: RETAILER_DELETE_SUCCESS, resp: "" })
            this.getRetailerList();
        }
    }
    callAllUserAPis() {
        this.getRetailerList();
        this.getStateList();
        this.fetchAgents();
        this.getDCData()
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
    getDCData = () => {
        let obj = {
            roleId: 2,
            search: this.state.dcCode
        }
        getDcCodeData(obj).then(resp => {
            if (resp) {
                this.setState({ dcCodeData: resp })
            }
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
    handleStateChange = (e, type) => {
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
                    // this.getRetailerList();
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
        this.setState({ selectedAgentOption: e, agentId: e.value }, () => {
            //this.getRetailerList() 
        })

    };
    getRetailerList = (status) => {
        // this.onCloseModal();
        let user = {};
        if (status == 'reset') {
            this.setState({
                cityData: [], startDate: moment(), endDate: moment(), dateChanged: false, cityId: 0, stateId: 0,
                StatusfilterId: '', selectedCityOption: '', selectedStateOption: '', selectedAgentOption: '',
                agentId: '', search: '', dcCode: '', dcCodeObj: '', currentPage: 0
            }, () => {
                sessionStorage.removeItem('retsearchDatas');
                user.roleId = 2;
                user.search = this.state.search;
                user.pages = this.state.currentPage ? this.state.currentPage : window.constant.ZERO;
                user.row = this.state.itemPerPage;
                this.props.fetchRetailers(user);
            })
        }
        else {
            if (this.state.stateId != 0) {
                user.state = this.state.stateId
                user.selectedStateOption = this.state.selectedStateOption
            }
            if (this.state.cityId != 0) {
                user.city = this.state.cityId;
                user.selectedCityOption = this.state.selectedCityOption

            }
            if (this.state.dateChanged) {
                user.startTime = this.state.startDate;
                user.endTime = this.state.endDate;
            }
            if (this.state.StatusfilterId) {
                user.status = this.state.StatusfilterId;
            }
            // if (status != "transagent") {

            // }
            if (this.state.agentId) {
                user.agentId = this.state.agentId;
                user.selectedAgentOption = this.state.selectedAgentOption;

            }
            if (this.state.dcCode) {
                user.dcCodeObj = this.state.dcCodeObj;
                user.dcCode = this.state.dcCode;
            }

            user.roleId = 2;
            user.search = this.state.search;
            if (status == "onSearch") {
                this.setState({ currentPage: 0 }, () => {
                    user.pages = 0
                })
            } else {
                user.pages = this.state.currentPage ? this.state.currentPage : window.constant.ZERO;
            }
            user.row = this.state.itemPerPage;
            sessionStorage.setItem('retsearchDatas', JSON.stringify(user));
            this.setState({
                selectedDatas: []
            })
            this.props.fetchRetailers(user);
        }
    };
    fetchAgents = () => {
        // let user = {};
        // user.roleId = 4;
        // user.flag = 2;
        let obj = {
            roleId: 4,
            flag: 2,
            search: this.state.dcCode
        }
        getDcCodeData(obj, "retailer").then(resp => {
            if (resp) {
                this.setState({ agentDataList: resp })
            }
        })
        // this.props.fetchSalesAgent(user);
    }
    handlePageChange = e => {
        e.preventDefault();
        let redrctpath = path.retailer.add;
        this.context.router.history.push(redrctpath);
    };

    viewCrop(RetstatusId, status, isActive) {
        let statusClass;
        // else {
        if (isActive == 0) {
            statusClass = window.strings.RETAILERS.INACTIVE
        }
        else if (status == 0 && isActive == 1) {
            statusClass = window.strings.RETAILERS.PENDING
        } else if (status == 1 && isActive == 1) {
            statusClass = window.strings.RETAILERS.ACCEPTED
        } else if (status == 2 && isActive == 1) {
            statusClass = window.strings.RETAILERS.REJECTED
        }
        //  else if (isActive == 0) {
        //     statusClass = window.strings.RETAILERS.INACTIVE
        // }
        // }
        // statusClass = window.strings.RETAILERS.INACTIVE

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
        this.setState({ StatusfilterId: e.target.value }, () => {
            //this.getRetailerList();
        })
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
            closePicker: true
        }, () => {
            // this.getRetailerList();
        })
    }
    resetSelection = (event, picker) => {
        //console.log("picker", picker);
        // this.setState({
        //     startDate: moment(),
        //     endDate: moment()
        // }, () => {
        //     // this.getRetailerList();
        // })
    }
    handleRowChange = (Data) => {
        this.setState({ selectedDatas: Data })
    }
    handleDcCodeChange = (Data) => {
        this.setState({ dcCodeObj: Data, dcCode: Data.value }, () => {
            // this.getRetailerList()
        })
    };
    onCloseModal = (type) => {
        this.setState({ open: false, popup: false })
        if (type == 'AgentAssignsuccess') {
            // this.getRetailerList('transagent');
            this.context.router.history.push('/category');
            this.context.router.history.goBack();
        }
    };
    onOpenModal = (e) => {
        e.preventDefault();
        if (this.state.selectedDatas && this.state.selectedDatas.length > 0) {
            this.setState({ open: true, popup: true });
        } else {
            toastr.error("Please Select any Customer");
        }
    };
    enableAdvanceSearch = (e) => {
        // e.preventDefault();
        let enableSearch = this.state.advanceSearch ? false : true
        this.setState({ advanceSearch: enableSearch })
    }
    // enableAdvanceshow = (e) => {
    //     // e.preventDefault();
    //     let enableSearch = this.state.advanceSearch ? false : true
    //     this.setState({ advanceSearch: enableSearch })
    // }
    searchResult = (e) => {

        e.preventDefault();
        if (this.state.search) {
            // let serObj = {
            // "search": this.state.search
            // };
            this.setState({ currentPage: 0 }, () => {
                this.getRetailerList();
            })
        }
    }
    resetSearch = () => {
        if (this.state.search) {
            this.setState({ search: '' }, () => {
                this.getRetailerList();
            });
        }
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.setState({ search: e.target.value })
    }

    onChange = (data) => {
        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected, filterWithPagination: true }, () => {
                this.getRetailerList();
            });
        }
    }

    render() {

        let dcData = [];
        // this.state.dcCodeData = [{ name: "0987", id: 1 }]

        this.state.dcCodeData && this.state.dcCodeData.map((item) => {

            let obj = { "label": item, "value": item };
            dcData.push(obj);
        })

        let start = this.state.startDate.format('DD-MM-YYYY');
        let end = this.state.endDate.format('DD-MM-YYYY');
        let label = start + ' - ' + end;
        if (this.state.dateChanged) {
            if (start === end) {
                label = start + ' - ' + end;
            }
        } else {
            label = ''
        }

        let excelDatas = [];
        let stateDropDown = []; let cityDropDown = []; let agentListDropDown = [];
        const statusDropdown =
            resorceJSON.statusOptions.map((item, index) => {
                return <option value={index} className="drop-option"> {item}</option>
            })

        let nilAgent = { "label": '-- Nil ---', "value": "nill" };
        agentListDropDown.push(nilAgent);
        this.state.agentDataList && this.state.agentDataList.map((item) => {
            let agentData = item.split(',');


            let obj = { "label": agentData[1], "value": agentData[0], "name": "agentName" };
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
            item.shopAddrss1 = item.shopAddress && item.shopAddress.address1 ? item.shopAddress.address1 : '-'
            item.shopLocalty = item.shopAddress && item.shopAddress.address2 ? item.shopAddress.address2 : '-'
            item.shopType = item.shopType && item.shopType.type ? item.shopType.type : item.shopType ? item.shopType : '-'
            if (item && item.shopAddress && item.shopAddress.name) {
                item.shopNames = item.shopAddress.name
            } else {
                item.shopNames = '-'
            }
            if (item && item.agentName) {
                item.agentName = item.agentName
            } else {
                item.agentName = '-'
            }
            item.shopAddressDataCountry = item.shopAddressData && item.shopAddressData.countrys && item.shopAddressData.countrys.name;
            item.shopAddressDataState = item.shopAddressData && item.shopAddressData.states && item.shopAddressData.states.name
            item.shopAddressDataCity = item.shopAddressData && item.shopAddressData.cities && item.shopAddressData.cities.name;
            if (item.shopAddrss && item.shopAddressDataCity && item.shopAddressDataState && item.shopAddressDataCountry) {
                item.fullShopAddrss = item.shopAddrss + ',' + item.shopAddressDataCity + ',' + item.shopAddressDataState + ',' + item.shopAddressDataCountry + '.';
            } else {
                item.fullShopAddrss = '-'
            }
            item.cusId = item.cusId && item.cusId ? item.cusId : '-';
            item.created = moment(item.created).format("DD/MM/YYYY");
            // item.created = item.created;



            // if (Object.keys(item.address).length > 1) {
            //     address = JSON.stringify(item.address).toString().replace(/"/g, '');
            // }
            // if (Object.keys(item.addressData).length > 1) {
            //     addressData = JSON.stringify(item.addressData).toString().replace(/"/g, '');
            // }
            // if (Object.keys(item.role).length > 1) {
            //     role = JSON.stringify(item.role).toString().replace(/"/g, '');
            // }
            // if (Object.keys(item.shopAddress).length > 1) {
            //     shopAddress = JSON.stringify(item.shopAddress).toString().replace(/"/g, '');
            // }
            // item.address = address;
            // item.role = role;
            // item.shopAddress = shopAddress;
            excelDatas.push(item);
        })
        let TransferAgentData = < TransferAgent onCloseModal={this.onCloseModal} getRetailerList={this.getRetailerList} selectedDatas={this.state.selectedDatas} clearRows={this.state.clearCheck} />
        return (
            <div className=" mt-4">
                <ModalData show={this.state.open} onHide={this.onCloseModal} modalData={TransferAgentData} ModalTitle="Update Agent" />

                <div className="retailersearchdiv">
                    {/* <SearchBar searchclassName="Retailersearch" SearchDetails={{ filterText: this.state.search, onChange: this.handleSearch, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} /> */}
                    <button type="button" className="advance-search" onClick={this.enableAdvanceSearch} > {this.state.advanceSearch ? '-Search' : '+Search'}
                        {/* <span className="advance-icon"></span>Advance Search */}
                        <span className="tooltip-text">Click to Search</span>
                    </button>
                    {/* <div className="retail-reset">
                        <button type="button" className="reset ml-2" onClick={(e) => this.getRetailerList('reset')}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
                    </div> */}
                </div>
                <div id="menu">
                    {/* <button className="advance-search"><span className="advance-icon"></span></button> */}


                    <div className="assign-box">
                        <button className="assign-btn" onClick={this.onOpenModal} ><i className="fa fa-plus sub-plus"></i>
                            {window.strings.USERMANAGEMENT.ASSIGN_TRANSFER_AGENT}
                        </button>
                        <div className="">
                            <ExportFile className="export-search" csvData={this.state.data} />
                        </div>
                    </div>

                    {/* <div className="main-filter d-flex justify-content-end">
                    <div className="row">
                        {/* <SearchBar className="Retailersearch" SearchDetails={{ filterText: this.state.search, onChange: this.handleSearch, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                        <ExportFile className="col-md-6" csvData={this.state.data} /> 
                    </div>
                </div> */}
                    {this.state.advanceSearch &&
                        <div className="">
                            <div className="sub-filter">
                                <div className="row">
                                    {/* <div className="col-md-4 date-range"><label className="label-title">Date:</label>
                                        <DateRangePicker
                                            placeholder="Please select a date"
                                            autoUpdateInput={false}
                                            onHide={this.resetSelection}
                                            placeholder="-- Date -- "
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            onApply={this.handleApply}
                                        >  <div className="date-box">
                                                <input type="text" className="form-control date-form ml-1" value={label} />
                                                <span className="date-group">
                                                    <i className="date-btn fa fa-calendar" />
                                                </span>
                                            </div>
                                        </DateRangePicker>
                                    </div>
                                    <div className="col-md-4 state-filter p-0"><label className="label-title label-line">State:</label>
                                        // <ReactMultiSelectCheckboxes options={dropDownData} onChange={this.checkbox} />
                                        <Select className="state-box ml-1"
                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }
                                                })
                                            }}
                                            value={this.state.selectedStateOption}
                                            onChange={(e) => this.handleStateChange(e, 'state')}
                                            options={stateDropDown}
                                            placeholder="--Select State--"
                                        />
                                        <div className="col-md-4 city-filter pr-0"><label className="label-title label-line">City:</label>
                                            <Select className="city-box ml-1"
                                                styles={{
                                                    control: base => ({
                                                        ...base,
                                                        borderColor: 'hsl(0,0%,80%)',
                                                        boxShadow: '#FE988D',
                                                        '&:hover': {
                                                            borderColor: '#FE988D'
                                                        }
                                                    })
                                                }}
                                                value={this.state.selectedCityOption}
                                                onChange={(e) => this.handleStateChange(e)}
                                                options={cityDropDown}
                                                placeholder="--Select City--"
                                            />
                                        </div>
                                        <button type="button" className="data-search ml-1" onClick={(e) => this.getRetailerList("onSearch")}>
                                            <i className="fa fa-search" aria-hidden="true"></i>Search
                                        <span className="tooltip-text">Click to Search</span>
                                        </button>
                                        <div className="retail-reset">
                                            <button type="button" className="reset ml-1" onClick={(e) => this.getRetailerList('reset')}>
                                                <i className="fa fa-refresh" aria-hidden="true"></i>
                                                <span className="tooltip-text">Reset</span>
                                            </button>
                                        </div> */}

                                    {/* <div data-tip="custom search"> */}
                                    <div className="input-tip">
                                        <input placeholder="Custom Search.."
                                            class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                        />
                                        <span className="tooltip-text">Custom Search</span>
                                    </div>
                                    <div className="col-md-3 agent-filter"><label className="label-title">Agent:</label>
                                        <Select
                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }
                                                })
                                            }}
                                            className="city-box ml-1"
                                            value={this.state.selectedAgentOption}
                                            onChange={(e) => this.handleAgentChange(e)}
                                            options={agentListDropDown}
                                            placeholder="--Select Agent--"
                                        />
                                    </div>
                                    <div className="status-filter pr-3"><label className="label-title">Status:</label>
                                        <select name="StatusfilterId" value={this.state.StatusfilterId} className="drop-select ml-1 green" onChange={(e) => this.statusFilter(e)}>
                                            <option value="" className="drop-option">-- Select Status--</option>
                                            {statusDropdown}
                                        </select>
                                    </div>
                                    <div className="col-md-3 code-filter p-0"><label className="label-title">DC Code:</label>
                                        {/* <ReactMultiSelectCheckboxes options={dropDownData} onChange={this.checkbox} /> */}
                                        <Select className="state-box"
                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    width: '105%',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }
                                                })
                                            }}
                                            value={this.state.dcCodeObj}
                                            onChange={(e) => this.handleDcCodeChange(e)}
                                            options={dcData}
                                            placeholder="--Select DC Code--"
                                        />
                                    </div>

                                </div>
                            </div >

                            <div className="main-filter ">
                                <div className="row ">
                                    {/* 
                                    // <div data-tip="custom search">
                                    <div className="input-tip">
                                        <input type="text" placeholder="Custom Search.."
                                            class="form-control" name="name" required="" value="" />
                                        <span className="tooltip-text">Custom Search</span>
                                    </div>
                                    <div className="col-md-3 agent-filter"><label className="label-title">Agent:</label>
                                        <Select
                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }
                                                })
                                            }}
                                            className="city-box ml-1"
                                            value={this.state.selectedAgentOption}
                                            onChange={(e) => this.handleAgentChange(e)}
                                            options={agentListDropDown}
                                            placeholder="--Select Agent--"
                                        />
                                    </div>
                                    <div className="status-filter pr-3"><label className="label-title">Status:</label>
                                        <select name="StatusfilterId" value={this.state.StatusfilterId} className="drop-select ml-1 green" onChange={(e) => this.statusFilter(e)}>
                                            <option value="" className="drop-option">-- Select Status--</option>
                                            {statusDropdown}
                                        </select>
                                    </div>
                                    <div className="col-md-3 code-filter p-0"><label className="label-title">DC Code:</label>
                                        // <ReactMultiSelectCheckboxes options={dropDownData} onChange={this.checkbox} />
                                        <Select className="state-box"
                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }
                                                })
                                            }}
                                            value={this.state.dcCodeObj}
                                            onChange={(e) => this.handleDcCodeChange(e)}
                                            options={dcData}
                                            placeholder="--Select DC Code--"
                                        />
                                    </div> */}
                                    {/* <button type="button" className="data-search ml-1" onClick={(e) => this.getRetailerList("onSearch")}>
                                        <i className="fa fa-search" aria-hidden="true"></i>Search
                                        <span className="tooltip-text">Click to Search</span>
                                    </button>
                                    <div className="retail-reset">
                                        <button type="button" className="reset ml-1" onClick={(e) => this.getRetailerList('reset')}>
                                            <i className="fa fa-refresh" aria-hidden="true"></i>
                                            <span className="tooltip-text">Reset</span>
                                        </button>
                                    </div> */}

                                    <div className="col-md-4 date-range col-wrapper pr-0">
                                        <label className="label-title">Date:</label>
                                        <DateRangePicker
                                            placeholder="Please select a date"
                                            autoUpdateInput={false}
                                            onHide={this.resetSelection}
                                            placeholder="-- Date -- "
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            onApply={this.handleApply}
                                        >
                                            <div className="date-box">
                                                <input type="text" className="form-control date-form ml-1" value={label} />
                                                <span className="date-group">
                                                    <i className="date-btn fa fa-calendar" />
                                                </span>
                                            </div>
                                        </DateRangePicker>
                                    </div>

                                    <div className="col-md-4 state-filter col-wrapper p-0"><label className="label-title">State:</label>
                                        {/* <ReactMultiSelectCheckboxes options={dropDownData} onChange={this.checkbox} /> */}
                                        <Select className="state-box ml-1"
                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }
                                                })
                                            }}
                                            value={this.state.selectedStateOption}
                                            onChange={(e) => this.handleStateChange(e, 'state')}
                                            options={stateDropDown}
                                            placeholder="--Select State--"
                                        />
                                    </div>
                                    <div className="col-md-4 city-filter col-wrapper pr-0"><label className="label-title">City:</label>
                                        <Select className="city-box ml-1"
                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }
                                                })
                                            }}
                                            value={this.state.selectedCityOption}
                                            onChange={(e) => this.handleStateChange(e)}
                                            options={cityDropDown}
                                            placeholder="--Select City--"
                                        />
                                    </div>
                                    <button type="button" className="data-search ml-1" onClick={(e) => this.getRetailerList("onSearch")}>
                                        <i className="fa fa-search" aria-hidden="true"></i>Search
                                        <span className="tooltip-text">Click to Search</span>
                                    </button>
                                    <div className="retail-reset">
                                        <button type="button" className="reset ml-1" onClick={(e) => this.getRetailerList('reset')}>
                                            <i className="fa fa-refresh" aria-hidden="true"></i>
                                            <span className="tooltip-text">Reset</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    <DataTableDynamic
                        customCss="fetchretailer"
                        title="Retailer List"
                        tableHead={this.state.columns}
                        tableDatas={excelDatas}
                        // handleEdit={this.itemEdit}
                        handleView={this.itemView}
                        // handleDelete={this.handleDelete}
                        // pagination={true}
                        // checkbox={true}
                        onRowSelected={this.handleRowChange}
                        handleRowChange={this.handleRowChange}
                    />
                    <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue }} />

                    {/* <DataTableDynamic customCss="fetchretailer" title="Category List" tableHead={this.state.columns}
                        tableDatas={this.state.data} handleView={this.itemView}
                        pagination={true} onRowSelected={this.handleRowChange}
                    /> */}
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
