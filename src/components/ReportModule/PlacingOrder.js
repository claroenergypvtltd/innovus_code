import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import GoogleMap from '../../shared/GoogleMap'
import { ReactBarLineChart } from '../../shared/Reactgraphcharts'
import { fetchOrderGraph, fetchOrderMap } from '../../actions/reportAction'
import TreeSelect from 'react-do-tree-select';
import { getRegion } from '../../actions/regionAction'

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
            mapSubmitted: false
        }
    }
    componentDidMount() {
        this.getRegionList()
    }
    componentWillReceiveProps(newProps) {
        if (newProps && newProps.regionList && newProps.regionList.Lists && newProps.regionList.Lists.datas) {
            this.setState({ regionListData: newProps.regionList.Lists.datas })
        }
    }
    getPlacingOrderGraph = () => {
        this.setState({ graphSubmitted: true })
        if (this.state.graphStartDate && this.state.graphSelectVal.length > 0) {
            let obj = {
                startDate: this.state.graphStartDate,
                id: 2,
                regionId: this.state.graphSelectVal
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
        if (this.state.mapStartDate && this.state.mapSelectVal.length > 0) {
            let obj = {
                startDate: this.state.mapStartDate,
                id: 2,
                regionId: this.state.mapSelectVal
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
        this.props.getRegion(obj)
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
            // this.setState({ mapSelectVal: dropDownValue })
        }
    }
    onGraphChecked = (Data) => {
        if (Data) {
            let dropDownValue = []
            Data && Data.map((item => {
                dropDownValue.push(item)
            }))
            this.state.graphSelectVal = dropDownValue
            // this.setState({ graphSelectVal: dropDownValue })
        }
    }
    callbackFunction = (childData, selectBarData) => {
        this.setState({ getBarChart: childData, subRegionBarData: selectBarData })
    }
    hideSubBarChart = () => {
        this.setState({ getBarChart: false })
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

        let regionData = []
        this.state.regionListData && this.state.regionListData.map((item, index) => {
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
        this.state.regionListData && this.state.regionListData.map((item, index) => {
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
                value: item.id,
                // children: childArray,
            }
            regionData1.push(obj)
        })

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
            <div className="customer-placeorder">
                <h4 className="user-title">{window.strings.REPORT.NUMBER_CUSTOMER_PLACEORDER}</h4>
                <div className="mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="map-view main-wrapper">
                                <h4 className="user-title">{window.strings.REPORT.MAP_VIEW}</h4>
                                <div className="d-flex justify-content-around">
                                    <div className="start-date">
                                        <label className="label-title">Choose Date * :</label>
                                        <input type="date" className="date-wrap form-control" onChange={this.handleChange} value={this.state.mapStartDate} name="mapStartDate" />
                                        {/* {this.state.mapSubmitted && (!this.state.mapStartDate) && this.state.mapSelectVal.length >= 1 && <div className='mandatory'>Date is required</div>}
                                        {this.state.mapSubmitted && (!this.state.mapStartDate) && this.state.mapSelectVal.length < 1 && <div className='mandatory'>Date is required</div>} */}
                                    </div>
                                    <div className="tree-box">
                                        <label className="label-title">Select Region * :</label>
                                        <input className="holder" placeholder="Search here.." />
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
                                        <label className="label-title">Choose Date * :</label>
                                        <input type="date" className="date-wrap form-control" onChange={this.handleChange} value={this.state.graphStartDate} name="graphStartDate" />
                                        {/* {this.state.graphSubmitted && (!this.state.graphStartDate) && this.state.graphSelectVal.length < 1 && <div className='mandatory'>Date is required</div>}
                                        {this.state.graphSubmitted && (!this.state.graphStartDate) && this.state.graphSelectVal.length >= 1 && <div className='mandatory'>Date is required</div>} */}

                                    </div>
                                    <div className="tree-box">
                                        <label className="label-title">Select Region * :</label>
                                        <input className="holder" placeholder="Search here.." />
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
                                <div className="mt-5">
                                    <ReactBarLineChart barChartData={graphData} parentCallback={this.callbackFunction} />
                                </div>
                                {this.state.getBarChart && <div className="pt-5">
                                    <ReactBarLineChart subGraphData={this.state.subRegionBarData} parentCallback={this.callbackFunction} />
                                    <div className="back-btn col-md-2"><button class="common-btn" onClick={this.hideSubBarChart}>close</button></div>
                                </div>}
                            </div>
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
export default connect(mapStateToProps, { getRegion })(PlacingOrder)