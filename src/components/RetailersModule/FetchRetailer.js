import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { fetchRetailers, deleteRetailer, updateStatusRetailer, getStateCity, getStateUsers, fetchAllRetailers, UpdateUsers } from '../../actions/SubmitRetailerAction';
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
import 'bootstrap-daterangepicker/daterangepicker.css';
import TransferAgent from './TransferAgent'
import { SearchBar, ReactPagination } from '../../shared'
import { getDcCodeData } from '../../actions/salesAgentAction';
import { imageBaseUrl, apiKey } from '../../config/config';
import { httpServices } from '../../services/http.services'
import { CSVLink, CSVDownload } from "react-csv";
import Geocode from "react-geocode";
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';

class FetchRetailer extends React.Component {
    csvLink = React.createRef()
    fileLink = React.createRef()
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
            itemPerPage: 10,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
            filterWithPagination: true,
            exportAllData: [],
            localityData: []
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
                    currentPage: sessRetsearchDatas.pages,
                }, () => {
                    if (sessRetsearchDatas.startTime && sessRetsearchDatas.endTime) {
                        this.setState({
                            dateChanged: true,
                            startDate: sessRetsearchDatas.startTime && moment(sessRetsearchDatas.startTime),
                            endDate: sessRetsearchDatas.endTime && moment(sessRetsearchDatas.endTime)
                        }, () => {
                            this.callAllUserAPis();
                            this.enableAdvanceSearch();
                        })
                    } else {
                        this.callAllUserAPis();
                        this.enableAdvanceSearch();
                    }
                });
            }
        } else {
            this.callAllUserAPis();
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.list.datas.length > 0 && !this.state.popup) {
            let selectlist = newProps.list.datas;
            this.getLocalty(selectlist);
            let Lists = selectlist && selectlist.map(item => {
                item.selectBox = this.viewCrop(item.id, item.status, item.isActive);
                return item;
            })
            this.setState({
                data: Lists, pageCount: newProps.list.totalCount / this.state.itemPerPage, totalCount: newProps.list.totalCount
            })
        } else {
            this.setState({ data: [], exceldatas: [], pageCount: newProps.list.totalCount / this.state.itemPerPage, totalCount: newProps.list.totalCount })
        }
        if (newProps.deletedData && newProps.deletedData == "200") {
            store.dispatch({ type: RETAILER_DELETE_SUCCESS, resp: "" })
            this.getRetailerList();
        }
    }

    getLocalty = (excelDatas) => {
        let locArray = [];
        let excelCount = excelDatas.length;
        let count = 1;
        excelDatas && excelDatas.forEach((item, index) => {
            Geocode.fromLatLng(item.shopAddress.latitude, item.shopAddress.longitude).then(resp => {
                if (resp && resp.results && resp.results[0] && resp.results[0].address_components) {
                    let locality = resp.results[0].address_components
                    let subLocalty = "";
                    let district = "";
                    let state = "";
                    let pincode = "";

                    locality.map(item => {
                        if (item.types.includes("sublocality")) {
                            subLocalty = item.long_name
                        }
                        if (item.types.includes("locality")) {
                            district = item.long_name
                        }
                        if (item.types.includes("administrative_area_level_1")) {
                            state = item.long_name
                        }
                        if (item.types.includes("postal_code")) {
                            pincode = item.long_name
                        }
                    })
                    excelDatas[index].shopLocalty = (subLocalty ? subLocalty + ', ' : '') + district + ', ' + state + ', ' + pincode
                    if (count == excelCount) {
                        this.setState({ exceldatas: excelDatas })
                    }
                    count++

                }
            });
        })
    }

    callAllUserAPis() {
        this.getRetailerList();
        this.getStateList();
        this.fetchAgents();
        this.getDCData();
        this.getCityList();
        this.setApiKey();
    }
    componentDidUpdate(preProps) {
        if (preProps.searchText != this.props.searchText) {
            this.getRetailerList();
        }
    }

    setApiKey = () => {
        Geocode.setApiKey(apiKey);
        Geocode.setLanguage("en");
        Geocode.setRegion("in");
        Geocode.enableDebug();
    }

    getStateList() {
        let obj = {
            "countryId": 101
        }
        getStateCity({ obj }).then(resp => {
            this.setState({ stateData: resp && resp.data })
        })
    }
    getCityList() {
        let obj = {
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
                    obj = {
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
        })

    };
    getRetailerList = (status) => {
        let user = {};
        if (status == 'reset') {
            this.setState({
                cityData: [], startDate: moment(), endDate: moment(), dateChanged: false, cityId: 0, stateId: 0,
                StatusfilterId: '', selectedCityOption: '', selectedStateOption: '', selectedAgentOption: '',
                agentId: '', search: '', dcCode: '', dcCodeObj: '', currentPage: 0, selectedDatas: [], itemPerPage: 10
            }, () => {
                sessionStorage.removeItem('retsearchDatas');
                user.roleId = 2;
                user.search = this.state.search;
                user.pages = this.state.currentPage ? this.state.currentPage : window.constant.ZERO;
                user.row = this.state.itemPerPage;
                this.props.fetchRetailers(user);
                this.redirectCategoryPath();
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
        let obj = {
            roleId: 4,
            flag: 2,
            search: this.state.dcCode ? this.state.dcCode : ''
        }
        getDcCodeData(obj, "retailer").then(resp => {
            if (resp) {
                this.setState({ agentDataList: resp })
            }
        })
    }
    handlePageChange = e => {
        e.preventDefault();
        let redrctpath = path.retailer.add;
        this.context.router.history.push(redrctpath);
    };

    viewCrop(RetstatusId, status, isActive) {
        let statusClass;

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
        if (status == 2) {
            statusClass = window.strings.RETAILERS.REJECTED
        }
        let ViewPage = <p className={statusClass} >{statusClass}</p>
        return ViewPage;
    }

    getStatus(RetstatusId, status, isActive) {
        let statusClass;
        if (status == 2) {
            return statusClass = window.strings.RETAILERS.REJECTED
        }
        if (isActive == 0) {
            return statusClass = window.strings.RETAILERS.INACTIVE
        }
        else if (status == 0 && isActive == 1) {
            return statusClass = window.strings.RETAILERS.PENDING
        } else if (status == 1 && isActive == 1) {
            return statusClass = window.strings.RETAILERS.ACCEPTED
        } else if (status == 2 && isActive == 1) {
            return statusClass = window.strings.RETAILERS.REJECTED
        }
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
                    this.getRetailerList();
                })
            },
            onCancel: () => this.getRetailerList()
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.UPDATERETSTATUS);
    }
    statusFilter(e) {
        this.setState({ StatusfilterId: e.target.value })
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
        })
    }
    handleRowChange = (Data) => {
        this.setState({ selectedDatas: Data })
    }
    handleDcCodeChange = (Data) => {
        this.setState({ dcCodeObj: Data, dcCode: Data.value })
    };
    onCloseModal = (type) => {
        this.setState({ open: false, popup: false })
        if (type == 'AgentAssignsuccess') {
            this.redirectCategoryPath();
        }
    };
    redirectCategoryPath = () => {
        this.context.router.history.push({ pathname: path.category.list, state: { retlrbckTrack: "backTrue" } });
    }
    enableAdvanceSearch = (e) => {
        // e.preventDefault();
        let enableSearch = this.state.advanceSearch ? false : true
        this.setState({ advanceSearch: enableSearch })
    }
    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            this.setState({ currentPage: 0 }, () => {
                this.getRetailerList();
            })
        }
    }
    resetSearch = () => {
        if (this.state.search) {
            this.setState({ search: '' }, () => {
                this.getRetailerList();
                this.redirectCategoryPath();
            });
        }
    }
    handleSearch = (e) => {
        e.preventDefault();
        e.target.value && e.target.value[0] == ' ' ? this.setState({ search: '' }) : this.setState({ search: e.target.value })
    }
    searchSubmit = (e) => {
        e.preventDefault();
        this.getRetailerList("onSearch");
    }

    onOpenModal = (e) => {
        e.preventDefault();
        if (this.state.selectedDatas && this.state.selectedDatas.length > 0) {
            this.setState({ open: true, popup: true });
        } else {
            toastr.error("Please Select any Customer");
        }
    };
    onChange = (data) => {
        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected, filterWithPagination: true }, () => {
                this.getRetailerList();
            });
            let selectedDatas = this.state.selectedDatas.splice(0)
        }
    }
    getAllretailer = () => {
        let user = {};
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
        if (this.state.StatusfilterId) {
            user.status = this.state.StatusfilterId;
        }
        if (this.state.agentId) {
            user.agentId = this.state.agentId;
        }
        if (this.state.dcCode) {
            user.dcCode = this.state.dcCode;
        }
        user.roleId = 2;
        user.search = this.state.search;
        user.pages = 0
        fetchAllRetailers(user).then(resp => {
            if (resp && resp.datas) {
                let Lists = resp.datas && resp.datas.map(item => {
                    item.selectBox = this.getStatus(item.id, item.status, item.isActive);
                    return item;
                })
                this.setState({ exportAllData: Lists })
                this.csvLink.current.link.click()
            }
        })
    };

    handleCountChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.getRetailerList();
        })
    }

    xlImport = (e) => {

        const files = e.target.files;
        if (files && files[0]) {
            this.setState({ file: files[0] }, () => {
                this.handleFile()
            });
        }
    }

    handleFile = () => {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */
            this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {

                let assignArray = [];
                this.state.data.map(item => {
                    let assignObj = {
                        "customerId": item.CustomerId ? item.CustomerId : "null",
                        "agentId": item.AgentId ? item.AgentId : "null"
                    }

                    assignArray.push(assignObj);

                })

                let obj = {
                    "assignUser": assignArray
                }

                this.props.UpdateUsers(obj, true);
                this.callAllUserAPis();
            });

        };

        if (rABS) {
            reader.readAsBinaryString(this.state.file);
        } else {
            reader.readAsArrayBuffer(this.state.file);
        };
    }

    callFile = (e) => {
        e.preventDefault();

        this.fileLink.current.click()
    }

    mapPage = (e) => {
        e.preventDefault();
        this.context.router.history.push({ pathname: path.user.mapView, state: { mapData: "" } });
    }

    render() {
        let dcData = [];
        this.state.dcCodeData && this.state.dcCodeData.map((item) => {
            let obj = { "label": item, "value": item };
            dcData.push(obj);
        })
        let start = this.state.startDate && this.state.startDate.format('DD-MM-YYYY');
        let end = this.state.endDate && this.state.endDate.format('DD-MM-YYYY');
        let label = start + ' - ' + end;
        if (this.state.dateChanged) {
            if (start === end) {
                label = start + ' - ' + end;
            }
        } else {
            label = ''
        }
        let excelDatas = [];
        let exportAllData = [];
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

        this.state.exceldatas && this.state.exceldatas.forEach((item, index) => {
            item.shopAddrss = item.shopAddress && item.shopAddress.address1 + ',' + item.shopAddress.address2;
            item.shopAddrss1 = item.shopAddress && item.shopAddress.address1 ? item.shopAddress.address1 : '-'
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
            item.latitude = item.shopAddress.latitude
            item.longitude = item.shopAddress.longitude
            item.shopOpenTime = item.shopAddress.shopOpeningTime
            item.retailerName = item.name
            item.shopImageLink = imageBaseUrl + item.shopAddress.image
            excelDatas.push(item);
        })

        this.state.exportAllData && this.state.exportAllData.map((item, index) => {
            item.shopAddrss = item.shopAddres && item.shopAddres[0] && item.shopAddres[0].address1 + ',' + item.shopAddres[0].address2;
            item.shopAddrss1 = item.shopAddres && item.shopAddres[0] && item.shopAddres[0].address1 ? item.shopAddres[0].address1 : '-'
            item.shopLocalty = item.shopAddres && item.shopAddres[0] && item.shopAddres[0].address2 ? item.shopAddres[0].address2 : '-'
            item.shopType = item.shopTypes && item.shopTypes[0] && item.shopTypes[0].type ? item.shopTypes[0].type : item.shopTypes[0] ? item.shopTypes[0] : '-'
            if (item && item.shopAddres && item.shopAddres[0] && item.shopAddres[0].name) {
                item.shopNames = item.shopAddres[0].name
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
            item.latitude = item.shopAddres && item.shopAddres[0].latitude
            item.longitude = item.shopAddres && item.shopAddres[0].longitude
            item.shopOpenTime = item.shopAddres && item.shopAddres[0].shopOpeningTime
            item.retailerName = item.name
            item.shopImageLink = imageBaseUrl + item.shopAddres[0].image
            exportAllData.push(item);
        })
        let TransferAgentData = < TransferAgent onCloseModal={this.onCloseModal} getRetailerList={this.getRetailerList} selectedDatas={this.state.selectedDatas} clearRows={this.state.clearCheck} />
        let PrintexcelDatas = [];
        exportAllData && exportAllData.map((item, index) => {
            let excelitem = {};
            excelitem.Status = item.selectBox && item.selectBox === '-' ? '' : item.selectBox;
            excelitem.OnboardedDate = item.created && item.created === '-' ? '' : item.created;
            excelitem.CustomerID = item.cusId && item.cusId === '-' ? '' : item.cusId;
            excelitem.ShopName = item.shopNames && item.shopNames === '-' ? '' : item.shopNames;
            excelitem.ShopAddress = item.shopAddrss1 && item.shopAddrss1 === '-' ? '' : item.shopAddrss1;
            excelitem.ShopLocalty = item.shopLocalty && item.shopLocalty === '-' ? '' : item.shopLocalty;
            excelitem.mobileNumber = item.mobileNumber && item.mobileNumber === '-' ? '' : item.mobileNumber;
            excelitem.shopType = item.shopType && item.shopType === '-' ? '' : item.shopType;
            excelitem.AgentName = item.agentName && item.agentName === '-' ? '' : item.agentName;
            excelitem.Latitude = item.latitude && item.latitude === '-' ? '' : item.latitude;
            excelitem.Longitude = item.longitude && item.longitude === '-' ? '' : item.longitude;
            excelitem.ShopOpenTime = item.shopOpenTime && item.shopOpenTime === '-' ? '' : item.shopOpenTime;
            excelitem.RetailerName = item.retailerName && item.retailerName === '-' ? '' : item.retailerName;
            excelitem.ShopImageLink = item.shopImageLink && item.shopImageLink === '-' ? '' : item.shopImageLink;
            PrintexcelDatas.push(excelitem);
        });

        return (
            <div className=" mt-4">
                <button type="button" className="excel-btn export-file ml-2" onClick={() => this.getAllretailer()}>Export</button>
                <CSVLink ref={this.csvLink} handleLegacy={true} filename='Retailers.csv' data={PrintexcelDatas}></CSVLink >
                <ModalData show={this.state.open} onHide={this.onCloseModal} modalData={TransferAgentData} ModalTitle="Update Agent" />
                <div className="retailersearchdiv">
                    <button type="button" className="advance-search" onClick={this.enableAdvanceSearch} > {this.state.advanceSearch ? '- Search' : '+ Search'}
                        <span className="tooltip-text">Click to Search</span>
                    </button>
                </div>
                <div id="menu">
                    <div className="assign-box">
                        {/* <button className="map-btn" onClick={(e) => this.mapPage(e)}><i class="fa fa-map-marker pr-1" aria-hidden="true"></i>Map</button> */}
                        <button className="import-btn" onClick={this.callFile}>Import</button>
                        <input type="file" ref={this.fileLink} className="form-control import-hide" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="file" onChange={this.xlImport} />
                        <button type="button" className="assign-btn" onClick={this.onOpenModal} ><i className="fa fa-plus sub-plus"></i>
                            {window.strings.USERMANAGEMENT.ASSIGN_TRANSFER_AGENT}
                        </button>
                    </div>
                    {this.state.advanceSearch &&
                        <div className="">
                            <form onSubmit={(e) => this.searchSubmit(e)}>
                                <div className="sub-filter">
                                    <div className="d-flex justify-content-between">
                                        <div className="input-tip">
                                            <form onSubmit={(e) => this.searchSubmit(e)} className="col-md-3">
                                                <input placeholder="Key Search.."
                                                    class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                                />
                                                <button type="submit" hidden></button>
                                            </form>
                                            <span className="tooltip-text">Key Search</span>
                                        </div>
                                        <div className="col-md-3 agent-filter p-0"><label className="label-title">Agent:</label>
                                            <Select
                                                styles={{
                                                    control: base => ({
                                                        ...base,
                                                        borderColor: 'hsl(0,0%,80%)',
                                                        boxShadow: '#FE988D',
                                                        // width: '270px',
                                                        '@media screen and (min-width:768px)': {
                                                            width: 'calc(116% + 2em)',
                                                        },
                                                        '@media screen and (min-width: 1300px)': {
                                                            width: 'calc(117% + 2em)',

                                                        },
                                                        '&:hover': {
                                                            borderColor: '#FE988D'
                                                        }
                                                    }),
                                                }}
                                                className="city-box ml-1"
                                                value={this.state.selectedAgentOption}
                                                onChange={(e) => this.handleAgentChange(e)}
                                                options={agentListDropDown}
                                                placeholder="--Select Agent--"
                                            />
                                        </div>
                                        <div className="status-filter pl-5"><label className="label-title">Status:</label>
                                            <select name="StatusfilterId" value={this.state.StatusfilterId} className="drop-select ml-1 green" onChange={(e) => this.statusFilter(e)}>
                                                <option value="" className="drop-option">--Select Status--</option>
                                                {statusDropdown}
                                            </select>
                                        </div>
                                        <div className="col-md-3 code-filter p-0"><label className="label-title">DC Code:</label>
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
                                                placeholder="--Select DC--"
                                            />
                                        </div>
                                    </div>
                                </div >
                                <div className="main-filter ">
                                    <div className="d-flex justify-content-between">
                                        <div className="col-md-4 date-range col-wrapper pr-0">
                                            <label className="label-title">Date:</label>
                                            <DateRangePicker
                                                placeholder="Please select a date"
                                                autoUpdateInput={false}
                                                // onHide={this.resetSelection}
                                                placeholder="-- Date -- "
                                                startDate={this.state.startDate}
                                                endDate={this.state.endDate}
                                                onApply={this.handleApply} >
                                                <div className="date-box">
                                                    <input type="text" className="form-control date-form ml-1" value={label} />
                                                    <span className="date-group">
                                                        <i className="date-btn fa fa-calendar" />
                                                    </span>
                                                </div>
                                            </DateRangePicker>
                                        </div>

                                        <div className="col-md-4 state-filter col-wrapper p-0"><label className="label-title">State:</label>
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
                            </form>
                        </div>}
                    <DataTableDynamic
                        customCss="fetchretailer"
                        title="Retailer List"
                        tableHead={this.state.columns}
                        tableDatas={excelDatas}
                        handleView={this.itemView}
                        onRowSelected={this.handleRowChange}
                        handleRowChange={this.handleRowChange}
                    />
                    <div className="page-box">
                        <label className="mr-3">Show / Page:</label>
                        <select required name="itemPerPage" className="" value={this.state.itemPerPage} onChange={this.handleCountChange}>
                            <option value="">Select</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />
                </div></div >
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
    { fetchRetailers, deleteRetailer, fetchSalesAgent, UpdateUsers },
)(FetchRetailer);
