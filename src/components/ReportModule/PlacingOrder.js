import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import GoogleMap from '../../shared/GoogleMap'
import { ReactBarLineChart } from '../../shared/Reactgraphcharts'
import { fetchOrderGraph, fetchOrderMap } from '../../actions/reportAction'
import TreeSelect from 'react-do-tree-select';
import { getReportRegion } from '../../actions/reportAction'
import { toastr } from 'react-redux-toastr';
import { getDcCodeData } from '../../actions/salesAgentAction';
// import { TreeSelect } from 'antd';
// import { SHOW_PARENT } from TreeSelect;

class PlacingOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            mapStartDate: '',
            graphStartDate: '',
            regionId: '',
            mapSelectVal: [],
            graphSelectVal: [],
            getBarChart: false,
            subRegionBarData: [],
            graphSubmitted: false,
            mapSubmitted: false,
            graphData: [],
            mapData: [],
            agentSelectVal: []
        }
    }
    componentDidMount() {
        this.getRegionList()
        this.fetchAgents()
    }
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
    getPlacingOrderGraph = () => {
        this.setState({ graphSubmitted: true })
        if ((!this.state.graphStartDate) || this.state.graphSelectVal.length == 0) {
            toastr.error("Mandatory fields are missing")
        }
        let value = []
        let data = {}
        this.state.graphSelectVal && this.state.graphSelectVal.map((item => {
            data = item.split('-')
            value.push(data[0])
        }))
        if (this.state.graphStartDate && this.state.graphSelectVal.length > 0) {
            let obj = {
                startDate: this.state.graphStartDate,
                id: 2,
                regionId: value
            }
            fetchOrderGraph(obj).then(resp => {
                if (resp && resp.data) {
                    this.setState({ graphData: resp.data })
                }
            })
        }
    }
    getPlacingOrderMap = () => {
        this.setState({ mapSubmitted: true })
        if ((!this.state.mapStartDate) || this.state.mapSelectVal.length == 0 || this.state.agentSelectVal.length == 0) {
            toastr.error("Mandatory fields are missing")
        }
        if (this.state.mapStartDate && this.state.mapSelectVal.length > 0 && this.state.agentSelectVal.length > 0) {
            let obj = {
                startDate: this.state.mapStartDate,
                id: 2,
                regionId: this.state.mapSelectVal,
                agentId: this.state.agentSelectVal
            }
            fetchOrderMap(obj).then(resp => {
                if (resp && resp.data) {
                    this.setState({ mapData: resp.data })
                }
            })
        }
    }
    getRegionList = () => {
        let obj = {
            page: '',
            rows: ''
        }
        getReportRegion(obj).then(resp => {
            this.setState({ regionListData2: resp && resp.datas })
        })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.reports.list })
    }
    // onSelect = (e) => {
    // }
    onMapChecked = (Data) => {
        if (Data) {
            let dropDownValue = []
            Data && Data.map((item => {
                if (!item.includes('Parent')) {
                    dropDownValue.push(item)
                }
            }))
            this.state.mapSelectVal = dropDownValue
        }
    }
    onGraphChecked = (Data) => {
        if (Data) {
            let dropDownValue = []
            Data && Data.map((item => {
                // let value = item.split('-')
                dropDownValue.push(item)

            }))
            this.state.graphSelectVal = dropDownValue
        }
    }
    onAgentChecked = (Data) => {
        if (Data) {
            let dropDownValue = []
            Data && Data.map((item => {
                dropDownValue.push(item)
            }))
            this.state.agentSelectVal = dropDownValue
        }
    }
    callbackFunction = (childData, selectBarData) => {
        let subBarData = [];
        subBarData.push(selectBarData && selectBarData.payload)
        this.setState({ getBarChart: childData, subRegionBarData: subBarData })
    }
    hideSubBarChart = () => {
        this.setState({ getBarChart: false })
    }
    resetMapSearch = () => {
        this.setState({
            mapStartDate: "",
            mapSelectVal: [],
            agentSelectVal: []
        });
    }
    resetGraphSearch = () => {
        this.setState({
            graphStartDate: "",
            graphSelectVal: []
        });
    }
    render() {
        const mapCheckbox = {
            enable: true,
            parentChain: true, // child Affects parent nodes;
            childrenChain: true, // parent Affects child nodes;
            halfChain: true, // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.mapSelectVal // Initialize check multiple lists
        }
        const graphCheckbox = {
            enable: true,
            parentChain: true, // child Affects parent nodes;
            childrenChain: true, // parent Affects child nodes;
            halfChain: true, // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.graphSelectVal // Initialize check multiple lists
        }
        const agentCheckBox = {
            enable: true,
            parentChain: true, // child Affects parent nodes;
            childrenChain: true, // parent Affects child nodes;
            halfChain: true, // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.agentSelectVal // Initialize check multiple lists
        }


        let regionData = []
        this.state.regionListData2 && this.state.regionListData2.map((item, index) => {
            let childArray = [];
            item.dcDatas && item.dcDatas.map((dcData, index) => {
                let obj = {
                    title: dcData.dcCode,
                    value: dcData.dcCode,
                }
                childArray.push(obj)
            })

            let obj = {
                title: item.name,
                value: item.name + 'Parent',
                children: childArray,
            }
            regionData.push(obj)
        })

        let regionData1 = []
        this.state.regionListData2 && this.state.regionListData2.map((item) => {
            // let childArray = [];
            // item.dcDatas && item.dcDatas.map((dcData, index) => {
            //     let obj = {
            //         title: dcData.dcCode,
            //         value: dcData.dcCode,
            //     }
            //     childArray.push(obj)
            // })

            let obj = {
                title: item.name,
                value: item.id + "-ParentData",
                // children: childArray
            }
            regionData1.push(obj)
        })

        let agentData = []
        this.state.agentDataList && this.state.agentDataList.map((item) => {
            let Data = item.split(',');


            let obj = {
                title: Data[1],
                value: Data[0]
            }
            agentData.push(obj)
        })

        let latLongData = [];
        this.state.mapData.orders && this.state.mapData.orders.map(item => {
            let obj = {
                lat: Number(item.shopAddress.latitude),
                lng: Number(item.shopAddress.longitude),
                order: 1
            }
            latLongData.push(obj)
        })

        this.state.mapData.users && this.state.mapData.users.map(item => {
            let obj = {
                lat: item.shopAddress && item.shopAddress.latitude ? Number(item.shopAddress.latitude) : '',
                lng: item.shopAddress && item.shopAddress.longitude ? Number(item.shopAddress.longitude) : ''
            }
            latLongData.push(obj)
        })

        let graphData = [];
        this.state.graphData.length > 0 && this.state.graphData.map(item => {
            let Data = item.split(',')
            let obj = {
                name: Data[0], Users: Data[1], Order: Data[2]
            }
            graphData.push(obj);
        })

        // let agentData = [];
        // this.state.agentDataList.length > 0 && this.state.agentDataList.map(item => {
        //     let Data = item.split(',')
        //     let obj = {
        //         name: Data[0], Users: Data[1], Order: Data[2]
        //     }
        //     graphData.push(obj);
        // })

        return (
            <div className="customer-placeorder">
                <h4 className="user-title">{window.strings.REPORT.NUMBER_CUSTOMER_PLACEORDER}</h4>
                <div className="mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="map-view main-wrapper">
                                <h4 className="user-title">{window.strings.REPORT.MAP_VIEW}</h4>
                                <div className="d-flex justify-content-around">
                                    <div className="start-date">
                                        <label className="label-title">Choose Date * </label>
                                        <input type="date" className="date-wrap form-control" onChange={this.handleChange} value={this.state.mapStartDate} name="mapStartDate" />
                                        {/* {this.state.mapSubmitted && (!this.state.mapStartDate) && this.state.mapSelectVal.length >= 1 && <div className='mandatory'>Date is required</div>}
                                        {this.state.mapSubmitted && (!this.state.mapStartDate) && this.state.mapSelectVal.length < 1 && <div className='mandatory'>Date is required</div>} */}
                                    </div>

                                    <div className="tree-box">
                                        <label className="label-title">Sales Agent * :</label>
                                        {/* <input className="holder" placeholder="Search here.." /> */}
                                        <TreeSelect
                                            treeData={agentData}
                                            style={{ width: 210, height: 100 }}
                                            selectVal={this.state.agentSelectVal}
                                            onSelect={this.onSelect}
                                            // onExpand={false}
                                            onChecked={this.onAgentChecked}
                                            checkbox={agentCheckBox}
                                            // showlevel={this.state.showlevel}
                                            customTitleRender={this.customTitleRender} />
                                        {/* {this.state.mapSubmitted && (!this.state.mapStartDate) && this.state.mapSelectVal.length < 1 && <div className='mandatory'>Region is required</div>}
                                        {this.state.mapSubmitted && this.state.mapStartDate && this.state.mapSelectVal.length < 1 && <div className='mandatory'>Region is required</div>} */}
                                    </div>
                                    {/* <div className="view-box">
                                        <button type="button" class="data-search" onClick={this.getPlacingOrderGraph}>
                                            <i class="fa fa-search" aria-hidden="true"></i>Search
                                        </button>
                                    </div> */}
                                </div>
                                <div className="view-box">
                                    <button type="button" class="data-search" onClick={this.getPlacingOrderMap}>
                                        <i class="fa fa-search" aria-hidden="true"></i>Search
                                        </button>
                                </div>
                                <div className="reset-box retail-reset m-0">
                                    <button type="button" className="reset ml-1" onClick={this.resetMapSearch}>
                                        <i className="fa fa-refresh" aria-hidden="true"></i>
                                        <span className="tooltip-text">Reset</span>
                                    </button>
                                </div>
                                <div className="d-flex">
                                    <div className="tree-box">
                                        <label className="label-title">Select Region * :</label>
                                        <TreeSelect
                                            treeData={regionData}
                                            style={{ width: 210, height: 100 }}
                                            selectVal={this.state.mapSelectVal}
                                            onSelect={this.onSelect}
                                            // onExpand={false}
                                            onChecked={this.onMapChecked}
                                            checkbox={mapCheckbox}
                                            // showlevel={this.state.showlevel}
                                            customTitleRender={this.customTitleRender} />
                                        {/* {this.state.mapSubmitted && (!this.state.mapStartDate) && this.state.mapSelectVal.length < 1 && <div className='mandatory'>Region is required</div>}
                                        {this.state.mapSubmitted && this.state.mapStartDate && this.state.mapSelectVal.length < 1 && <div className='mandatory'>Region is required</div>} */}
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <GoogleMap latLongData={latLongData} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="graph-view main-wrapper">
                                <h4 className="user-title">{window.strings.REPORT.GRAPH_VIEW}</h4>
                                <div className="d-flex justify-content-around">
                                    <div className="start-date mr-2">
                                        <label className="label-title">Choose Date * </label>
                                        <input type="date" className="date-wrap form-control" onChange={this.handleChange} value={this.state.graphStartDate} name="graphStartDate" />
                                        {/* {this.state.graphSubmitted && (!this.state.graphStartDate) && this.state.graphSelectVal.length < 1 && <div className='mandatory'>Date is required</div>}
                                        {this.state.graphSubmitted && (!this.state.graphStartDate) && this.state.graphSelectVal.length >= 1 && <div className='mandatory'>Date is required</div>} */}

                                    </div>
                                    <div className="tree-box">
                                        <label className="label-title">Select Region * :</label>
                                        {/* <input className="holder" placeholder="Search here.." /> */}
                                        <TreeSelect
                                            treeData={regionData1}
                                            style={{ width: 210, height: 100 }}
                                            selectVal={this.state.graphSelectVal}
                                            onSelect={this.onSelect}
                                            // onExpand={false}
                                            onChecked={this.onGraphChecked}
                                            checkbox={graphCheckbox}
                                            // showlevel={this.state.showlevel}
                                            customTitleRender={this.customTitleRender} />

                                        {/* {this.state.graphSubmitted && (!this.state.graphStartDate) && this.state.graphSelectVal.length < 1 && <div className='mandatory'>Region is required</div>}
                                        {this.state.graphSubmitted && this.state.graphStartDate && this.state.graphSelectVal.length < 1 && <div className='mandatory'>Region is required</div>} */}
                                    </div>
                                </div>
                                <div className="view-box">
                                    <button type="button" class="data-search" onClick={this.getPlacingOrderGraph}>
                                        <i class="fa fa-search" aria-hidden="true"></i>Search
                                        </button>
                                </div>
                                <div className="reset-box retail-reset m-0">
                                    <button type="button" className="reset ml-1" onClick={this.resetGraphSearch}>
                                        <i className="fa fa-refresh" aria-hidden="true"></i>
                                        <span className="tooltip-text">Reset</span>
                                    </button>
                                </div>
                                {/* <div className="mt-5">
                                    <ReactBarLineChart barChartData={graphData} parentCallback={this.callbackFunction} />
                                </div> */}

                            </div>
                            {this.state.graphData.length > 0 ? <div className="mt-5">
                                <ReactBarLineChart barChartData={graphData} parentCallback={this.callbackFunction} />
                            </div> : <div className="record-box">No record found</div>}


                            {this.state.getBarChart && <div className="pt-5">
                                <ReactBarLineChart barChartData={this.state.subRegionBarData} parentCallback={this.callbackFunction} />
                                <div className="back-btn col-md-2"><button class="common-btn" onClick={this.hideSubBarChart}>close</button></div>
                            </div>}
                        </div>
                    </div>

                </div>
                <div className="back-btn my-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => ({
    regionList: state.region
})
export default connect(mapStateToProps, { getReportRegion })(PlacingOrder)