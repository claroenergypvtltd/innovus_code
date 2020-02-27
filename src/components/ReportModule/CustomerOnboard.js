import React, { Component } from 'react'
import { connect } from 'react-redux';
import TreeSelect from 'react-do-tree-select';
import { getRegion } from '../../actions/regionAction'
import { getCustomerMapView, getCustomerGraphView, getReportRegion } from '../../actions/reportAction'
//import { fetchReportGraph } from '../../actions/reportAction'
import { path } from '../../constants';
import { ReactBarChart } from '../../shared/Reactgraphcharts'
import GoogleMap from '../../shared/GoogleMap'
import { toastr } from 'react-redux-toastr'

class CustomerOnboard extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            dateValue = today.getDate() >= 10 ? today.getDate() : ('0' + today.getDate()),
            monthValue = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1)),
            date = today.getFullYear() + '-' + monthValue + '-' + dateValue

        this.state = {
            showlevel: 0,
            startDate: '',
            expiryDate: '',
            startDate1: '',
            expiryDate1: '',
            selectVal: [],
            selectVal1: [],
            mapData: [],
            graphData: [],
            errors: {},
            dateValidation: date,
            map: false,
            graph: false
        }
    }

    componentDidMount() {
        // this.getRegion();
        this.getReportRegion();
        if (this.props.view == "map") {
            this.setState({ map: true })
        }
        if (this.props.view == "graph") {
            this.setState({ graph: true })
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps && newProps.regionList && newProps.regionList.Lists && newProps.regionList.Lists.datas) {
            this.setState({ regionListData: newProps.regionList.Lists.datas, totalCount: newProps.regionList.Lists.totalCount })
        }
    }

    getReportRegion = () => {
        let obj = {
            page: '',
            rows: ''
        }
        getReportRegion(obj).then(resp => {
            if (resp && resp.datas) {
                this.setState({ regionListData1: resp.datas, regionListData: resp.datas })
            }
        })
    }

    onChecked = (data, value) => {
        let regionArray = [];
        data && data.map(item => {
            // if (!item.includes('parent')) {
            regionArray.push(item);

            // }
        })
        // this.state.selectVal = regionArray
        this.setState({ selectVal: regionArray })
    }

    onChecked1 = (data, value) => {
        let regionArray = [];
        data.map(item => {
            regionArray.push(item);
        })
        this.setState({ check: true, selectVal1: regionArray })
        // this.state.selectVal1 = regionArray
    }

    redirectPage = () => {
        this.props.history.push({ pathname: path.reports.list, state: { customerOnboardBack: 'customerOnboardSessionBack' } });
    }

    dateChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    getMapView = () => {
        if (this.state.startDate && this.state.expiryDate && this.state.selectVal.length > 0) {
            let selectVal = [];
            this.state.selectVal && this.state.selectVal.map(item => {
                if (!item.includes('-parent')) {
                    selectVal.push(item);
                }
            })

            if ((this.state.startDate <= this.state.expiryDate)) {
                let obj = {
                    startDate: this.state.startDate,
                    expiryDate: this.state.expiryDate,
                    regionData: selectVal
                }

                getCustomerMapView(obj).then(resp => {
                    if (resp && resp.data) {
                        this.setState({ mapData: resp.data })
                    }
                    // else {
                    //     toastr.error("No records found")
                    // }
                })
            } else {
                toastr.error("Date Invalid")
            }
        } else {
            toastr.error("Mandatory fields are missing")
        }
    }

    getGraphView = () => {
        this.setState({ graphSubmit: true })
        if (this.state.startDate1 && this.state.expiryDate1 && this.state.selectVal1.length > 0) {
            if ((this.state.startDate1 <= this.state.expiryDate1)) {

                let selectVal1 = [];
                this.state.selectVal1 && this.state.selectVal1.map(item => {
                    if (item.includes('-')) {
                        let data = item.split('-');
                        selectVal1.push(data[0]);
                    }
                })

                let obj = {
                    startDate: this.state.startDate1,
                    expiryDate: this.state.expiryDate1,
                    regionData: selectVal1
                }

                getCustomerGraphView(obj).then(resp => {
                    if (resp && resp.data) {
                        this.setState({ graphData: resp.data })
                    }
                })

            } else {
                toastr.error("Date Invalid")
            }

        } else {
            toastr.error("Mandatory fields are missing")
        }
    }

    resetMapSearch = () => {
        this.setState({
            startDate: "",
            expiryDate: "",
            selectVal: [],
            mapData: []
        });
    }
    resetGraphSearch = () => {
        this.setState({
            startDate1: "",
            expiryDate1: "",
            selectVal1: [],
            graphData: []
        });
    }
    render() {
        let treeData = []
        this.state.regionListData && this.state.regionListData.map((item, index) => {
            let childArray = [];
            item.dcDatas && item.dcDatas.map((dcData, index) => {
                let obj = {
                    title: dcData.name,
                    value: dcData.dcCode,
                }
                childArray.push(obj)
            })

            let obj = {
                title: item.name,
                value: item.name + '-parent',
                children: childArray,
            }
            treeData.push(obj)
        })

        let treeData1 = []
        this.state.regionListData1 && this.state.regionListData1.map((item, index) => {
            let obj = {}

            let selectedVal = '';

            this.state.selectVal1 && this.state.selectVal1.map(selectedItem => {
                if (selectedItem) {
                    selectedVal = selectedItem;
                }
            })

            if (selectedVal) {

                if ((item.id + '-Parent' == selectedVal) && this.state.check) {
                    obj = {
                        title: item.name,
                        value: item.id + '-Parent',
                        // disabled: true
                    }
                } else {
                    obj = {
                        title: item.name,
                        value: item.id + '-Parent',
                        disabled: true
                    }
                }
            } else {
                obj = {
                    title: item.name,
                    value: item.id + '-Parent',
                }
            }

            treeData1.push(obj)
        })

        const checkbox = {
            enable: true,
            parentChain: true,              // child Affects parent nodes;
            childrenChain: true,            // parent Affects child nodes;
            halfChain: false,                // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.selectVal            // Initialize check multiple lists
        }
        const checkbox1 = {
            enable: true,
            parentChain: true,              // child Affects parent nodes;
            childrenChain: false,            // parent Affects child nodes;
            halfChain: true,                // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.selectVal1           // Initialize check multiple lists
        }

        let latLongData = [];

        this.state.mapData && this.state.mapData.map(item => {
            let obj = {
                lat: Number(item.shopAddress.latitude),
                lng: Number(item.shopAddress.longitude)
            }
            latLongData.push(obj)
        })

        let graphData = [];
        this.state.graphData && this.state.graphData.map(item => {
            let Data = item.split(',')
            let obj = {
                name: Data[0], Users: Data[1],
            }
            graphData.push(obj);
        })
        return (
            <div className="customer-onboard">
                {this.state.map && <div className="map-view">
                    <div className="d-flex justify-content-around">
                        <div className="start-date mr-2">
                            <label className="label-title">Start Date * </label>
                            <input type="date" value={this.state.startDate} name="startDate" onChange={this.dateChange} max={this.state.dateValidation} className="form-control date-wrap" />
                            {/* {this.state.mapSubmit && !this.state.startDate && <div className="mandatory">{"Start Date" + window.strings['ISREQUIRED']}</div>} */}
                        </div>
                        <div className="end-date mr-2">
                            <label className="label-title">End Date * </label>
                            <input type="date" value={this.state.expiryDate} name="expiryDate" onChange={this.dateChange} max={this.state.dateValidation} className="form-control date-wrap" />
                            {/* {this.state.mapSubmit && !this.state.expiryDate && <div className="mandatory">{"End Date:" + window.strings['ISREQUIRED']}</div>} */}
                        </div>
                        <div className="tree-box">
                            <label className="label-title">Select Region * </label>
                            {/* <input className="holder" placeholder="Search here.." /> */}
                            {/* <span className="hol"></span> */}
                            {/* <input type="search" name="search" placeholder="search..." rel="search" className="im-se" /> */}
                            <TreeSelect
                                wrapperClassName="text-hol"
                                treeData={treeData}
                                style={{ width: 210, height: 100 }}
                                selectVal={this.state.selectVal}
                                onSelect={this.onSelect}
                                checkbox={checkbox}
                                onChecked={this.onChecked}
                                customTitleRender={this.customTitleRender} />
                            {/* {this.state.mapSubmit && this.state.selectVal.length < 1 && <div className="mandatory">{"Region " + window.strings['ISREQUIRED']}</div>} */}
                        </div>
                    </div>
                    <div className="col-md-11 search-wrap">
                        <div className="view-box">
                            <button onClick={this.getMapView} className="data-search" >
                                <i className="fa fa-search" aria-hidden="true"></i>Search
                                    </button>
                        </div>
                        <div className="retail-reset">
                            <button type="button" className="reset ml-1" onClick={this.resetMapSearch}>
                                <i className="fa fa-refresh" aria-hidden="true"></i>
                                <span className="tooltip-text">Reset</span>
                            </button>
                        </div>
                    </div>
                    {/* <div className="reset-box retail-reset m-0">
                                    <button type="button" className="reset ml-1" onClick={this.resetMapSearch}>
                                        <i className="fa fa-refresh" aria-hidden="true"></i>
                                        <span className="tooltip-text">Reset</span>
                                    </button>
                                </div> */}
                    <div className="pt-5">
                        <GoogleMap latLongData={latLongData} />
                    </div>
                </div>}
                {this.state.graph &&
                    <div className="graph-view pb-5">
                        <div className="d-flex justify-content-around">
                            <div className="start-date col-md-2">
                                <label className="label-title">Start Date * </label>
                                <input type="date" value={this.state.startDate1} name="startDate1" onChange={this.dateChange} max={this.state.dateValidation} className="form-control date-wrap" />
                                {/* {this.state.graphSubmit && !this.state.startDate1 && <div className="mandatory">{"Start Date " + window.strings['ISREQUIRED']}</div>} */}
                            </div>
                            <div className="end-date col-md-2">
                                <label className="label-title">End Date * </label>
                                <input type="date" value={this.state.expiryDate1} name="expiryDate1" onChange={this.dateChange} max={this.state.dateValidation} className="form-control date-wrap" />
                                {/* {this.state.graphSubmit && !this.state.expiryDate1 && <div className="mandatory">{"End Date " + window.strings['ISREQUIRED']}</div>} */}
                            </div>
                            <div className="tree-box">
                                <label className="label-title">Select Region * </label>
                                <TreeSelect
                                    treeData={treeData1}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.selectVal1}
                                    onChecked={this.onChecked1}
                                    checkbox={checkbox1}
                                    customTitleRender={this.customTitleRender} />
                                {/* {this.state.graphSubmit && this.state.selectVal1.length < 1 && <div className="mandatory">{"Region " + window.strings['ISREQUIRED']}</div>} */}
                            </div>
                        </div>
                        <div className="col-md-11 search-wrap">
                            <div className=" view-box">
                                <button type="button" className="data-search" onClick={this.getGraphView}>
                                    <i className="fa fa-search" aria-hidden="true"></i>Search
                                    </button>
                            </div>
                            <div className="retail-reset">
                                <button type="button" className="reset ml-1" onClick={this.resetGraphSearch}>
                                    <i className="fa fa-refresh" aria-hidden="true"></i>
                                    <span className="tooltip-text">Reset</span>
                                </button>
                            </div>
                        </div>
                        <div className="record-box">
                            {graphData.length > 0 ? <ReactBarChart barChartData={graphData} /> : "No record Found"}
                        </div>
                    </div>}
                {/* <div className="back-btn my-3">
                    <button className="common-btn" onClick={this.redirectPage}>Back</button>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    regionList: state.region
})
export default connect(mapStateToProps, { getRegion })(CustomerOnboard)
