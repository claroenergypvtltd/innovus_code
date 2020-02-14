import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import TreeSelect from 'react-do-tree-select';
import { getReportRegion } from '../../actions/reportAction'
import { LineChartView } from '../../shared/Reactgraphcharts'

export default class OrderValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showlevel: 0,
            startDate: '',
            expiryDate: '',
            regionSelectVal: [],
            subRegionSelectVal: [],
            lineChartData: [],
            errors: {},
            graphSubmit: false
        }
    }
    componentDidMount() {
        this.getReportRegion();
    }
    getReportRegion = () => {
        let obj = {
            page: '',
            rows: ''
        }
        getReportRegion(obj).then(resp => {
            if (resp && resp.datas) {
                this.setState({ regionListData2: resp.datas })
            }
        })
    }
    getSubRegion = (Data) => {

    }
    getGraphData = () => {
        if (this.state.startDate && this.state.expiryDate && this.state.regionSelectVal.length > 0 && this.state.skuSelectValue.length > 0) {

        }
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.reports.list, state: { executivePerfomanceBack: 'executivePerfomanceSessionBack' } });
    }
    resetGraphSearch = () => {
        this.setState({
            startDate: "",
            expiryDate: "",
            regionSelectVal: [],
            subRegionSelectVal: [],
            lineChartData: []
        });
    }
    onRegionChecked = (Data) => {
        let regionArray = [];
        Data && Data.map(item => {
            if (!item.includes('parent')) {
                regionArray.push(item);

            }
        })
        // this.setState({ regionSelectVal: regionArray })
        if (this.state.regionSelectVal && this.state.regionSelectVal.length > 0) {
            this.getSubRegion(Data)
        }
    }
    onSkuChecked = (Data) => {

    }
    render() {
        let regionData = []
        this.state.regionListData2 && this.state.regionListData2.map((item, index) => {
            let childArray = [];
            item.dcDatas && item.dcDatas.map((dcData, index) => {
                let obj = {
                    title: dcData.name,
                    value: dcData.dcCode
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
        let treeData = []
        this.state.salesAgentList && this.state.salesAgentList.map((item) => {
            let Data = item.split(',');


            let obj = {
                title: Data[1],
                value: Data[0]
            }
            treeData.push(obj)
        })
        const regionCheckbox = {
            enable: true,
            parentChain: true,              // child Affects parent nodes;
            childrenChain: true,            // parent Affects child nodes;
            halfChain: true,                // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.regionSelectVal            // Initialize check multiple lists
        }
        const skuCheckbox = {
            enable: true,
            parentChain: true,              // child Affects parent nodes;
            childrenChain: true,            // parent Affects child nodes;
            halfChain: true,                // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.subRegionSelectVal           // Initialize check multiple lists
        }
        return (
            <div>
                <h4 className="user-title">{window.strings.REPORT.ORDERVALUEINR}</h4>
                <div className="mt-3">
                    <div className="main-wrapper py-3 sale-box">
                        <div className="d-flex justify-content-around">
                            <div className="start-date">
                                <label className="label-title">Start Date * </label>
                                <input type="date" className="date-wrap form-control" value={this.state.startDate} onChange={this.dateChange} name="startDate" />
                            </div>
                            <div className="end-date">
                                <label className="label-title">End Date * </label>
                                <input type="date" className="date-wrap form-control" value={this.state.expiryDate} onChange={this.dateChange} name="expiryDate" />
                            </div>


                            <div className="tree-box">
                                <label className="label-title">Select Region * </label>
                                <TreeSelect
                                    treeData={regionData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.regionSelectVal}
                                    onChecked={this.onRegionChecked}
                                    checkbox={regionCheckbox}
                                    customTitleRender={this.customTitleRender} />
                            </div>
                            <div className="tree-box">
                                <label className="label-title">Select SKU * </label>
                                <TreeSelect
                                    treeData={treeData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.skuSelectValue}
                                    onChecked={this.onSkuChecked}
                                    checkbox={skuCheckbox}
                                    customTitleRender={this.customTitleRender} />
                            </div>
                        </div>
                        <div className="mr-5 pr-3 search-wrap">
                            <div className="view-box">
                                <button type="button" class="data-search" onClick={this.getGraphData}>
                                    <i class="fa fa-search" aria-hidden="true"></i>Search
                            </button>
                            </div>
                            <div className="retail-reset">
                                <button type="button" className="reset ml-1" onClick={this.resetGraphSearch}>
                                    <i className="fa fa-refresh" aria-hidden="true"></i>
                                    <span className="tooltip-text">Reset</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <LineChartView />
                    </div>
                </div>
                <div className="back-btn my-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div>
            </div>
        )
    }
}