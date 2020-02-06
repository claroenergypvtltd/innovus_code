import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import GoogleMap from '../../shared/GoogleMap'
import { ReactBarLineChart } from '../../shared/Reactgraphcharts'
import { fetchReportGraph, fetchReportMap } from '../../actions/reportAction'
import TreeSelect from 'react-do-tree-select';
import { getRegion } from '../../actions/regionAction'

class PlacingOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            mapStartDate: '',
            graphStartDate: '',
            regionId: ''
        }
    }
    componentDidMount() {
        this.getPlacingOrderGraph()
        this.getPlacingOrderMap()
        this.getRegionList()
    }
    componentWillReceiveProps(newProps) {
        if (newProps && newProps.regionList && newProps.regionList.Lists && newProps.regionList.Lists.datas) {
            this.setState({ regionListData: newProps.regionList.Lists.datas })
        }
    }
    getPlacingOrderGraph = () => {
        if (this.state.graphStartDate) {
            let obj = {
                startDate: this.state.graphStartDate,
                id: 1,
                regionId: this.state.regionId
            }
            fetchReportGraph(obj).then(resp => {
                if (resp) {

                }
            })
        }
    }
    getPlacingOrderMap = () => {

        fetchReportMap().then(resp => {

        })
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

    render() {
        const checkbox = {
            enable: true,
            parentChain: true, // child Affects parent nodes;
            childrenChain: true, // parent Affects child nodes;
            halfChain: true, // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: [] // Initialize check multiple lists
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
                value: item.name,
                children: childArray,
            }
            regionData.push(obj)

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
                                    <div className="start-date mr-2">
                                        <label className="label-title">Choose Date:</label>
                                        <input type="date" className="form-control" onChange={this.handleChange} value={this.state.mapStartDate} name="mapStartDate" />
                                    </div>
                                    <div className="tree-box mt-3">
                                        <TreeSelect
                                            treeData={regionData}
                                            style={{ width: 210, height: 100 }}
                                            selectVal={this.state.selectVal}
                                            onSelect={this.onSelect}
                                            onExpand={false}
                                            onChecked={this.onChecked}
                                            checkbox={checkbox}
                                            showlevel={this.state.showlevel}
                                            customTitleRender={this.customTitleRender} />
                                    </div>
                                </div>
                                <div className="pt-5">
                                    <GoogleMap />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="graph-view main-wrapper">
                                <h4 className="user-title">{window.strings.REPORT.GRAPH_VIEW}</h4>
                                <div className="d-flex">
                                    <div className="start-date mr-2">
                                        <label className="label-title">Choose Date:</label>
                                        <input type="date" className="form-control" onChange={this.handleChange} value={this.state.graphStartDate} name="graphStartDate" />
                                        <div className="back-btn col-md-2"><button class="common-btn" onClick={this.getPlacingOrderGraph}>search</button></div>
                                    </div>
                                </div>
                                <div >
                                    <ReactBarLineChart />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="back-btn mt-3">
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