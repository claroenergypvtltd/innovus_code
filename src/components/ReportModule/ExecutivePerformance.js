import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import TreeSelect from 'react-do-tree-select';
import { getRegion } from '../../actions/regionAction'
import { getCustomerMapView } from '../../actions/reportAction'
import { fetchReportGraph } from '../../actions/reportAction'
import { ReactBarLineChart } from '../../shared/Reactgraphcharts'
import GoogleMap from '../../shared/GoogleMap'

class ExecutivePerformance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showlevel: 0,
            startDate: '',
            expiryDate: '',
            selectVal: [],
            selectVal1: [],
            errors: {}
        }
    }

    componentDidMount() {
        this.getRegion();
        let dData = [
            {
                name: 'parent 1',
                name: 'parent 1',
                dcDatas: [
                    {
                        dcCode: 'child 1',
                        dcCode: 'child 1',
                    }, {
                        dcCode: 'child 2',
                        dcCode: 'child 2',
                    }, {
                        dcCode: 'child 3',
                        dcCode: 'child 3',
                    }
                ]
            }, {
                name: 'parent 2',
                name: 'parent 2',
                dcDatas: [
                    {
                        dcCode: 'child 4',
                        dcCode: 'child 4',
                    }, {
                        dcCode: 'child 5',
                        dcCode: 'child 5',
                    }
                ]
            }
        ]

        this.setState({ regionListData: dData })

    }

    componentWillReceiveProps(newProps) {
        if (newProps && newProps.regionList && newProps.regionList.Lists && newProps.regionList.Lists.datas) {
            this.setState({ regionListData: newProps.regionList.Lists.datas, totalCount: newProps.regionList.Lists.totalCount })
        }
    }

    getRegion = () => {
        let obj = {
            page: '',
            rows: ''
        }
        this.props.getRegion(obj)
    }

    dateChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChecked = (data, value) => {
        let regionArray = [];
        data.map(item => {
            if (!item.includes('parent')) {
                regionArray.push(item);

            }
        })
        this.state.selectVal = regionArray
    }

    getGraphView = () => {
        this.setState({ graphSubmit: true })
        if (this.state.startDate1 && this.state.expiryDate1 && (this.state.startDate1 <= this.state.expiryDate1) && this.state.selectVal1.length > 0) {
            let obj = {
                startDate1: this.state.startDate1,
                expiryDate1: this.state.expiryDate1,
                regionData1: this.state.selectVal1
            }

            // getCustomerGraphView(obj).then(resp => {
            //     if (resp) {

            //     }
            // })
        }

    }

    redirectPage = () => {
        this.props.history.push({ pathname: path.reports.list, state: { executivePerfomanceBack: 'executivePerfomanceSessionBack' } });
    }
    render() {

        let treeData = []
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
                value: item.name + 'parent',
                children: childArray,
            }
            treeData.push(obj)
        })


        const checkbox = {
            enable: true,
            parentChain: true,              // child Affects parent nodes;
            childrenChain: true,            // parent Affects child nodes;
            halfChain: true,                // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.selectVal            // Initialize check multiple lists
        }

        return (
            <div className="customer-onboard">
                <h4 className="user-title">{window.strings.REPORT.SALES_EXECUTIVE_PERFORMANCE}</h4>
                <div className="mt-3">
                    <div className="map-view main-wrapper">
                        <div className="d-flex justify-content-around">
                            <div className="start-date mr-2">
                                <label className="label-title">Start Date:</label>
                                <input type="date" className="date-wrap form-control" />
                            </div>
                            <div className="end-date mr-2">
                                <label className="label-title">End Date:</label>
                                <input type="date" className="date-wrap form-control" />
                            </div>

                            <div className="tree-box">
                                <TreeSelect
                                    treeData={treeData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.selectVal}
                                    onChecked={this.onChecked}
                                    checkbox={checkbox}
                                    customTitleRender={this.customTitleRender} />
                            </div>
                            {this.state.graphSubmit && this.state.selectVal1.length < 1 && <div className="mandatory">{"Region " + window.strings['ISREQUIRED']}</div>}


                        </div>

                        <div >
                            <ReactBarLineChart />
                        </div>

                        <div >
                            <ReactBarLineChart />
                        </div>

                        <div >
                            <ReactBarLineChart />
                        </div>

                        <div className="view-box">
                            <button type="button" class="data-search" onClick={this.getGraphView}>
                                <i class="fa fa-search" aria-hidden="true"></i>Search
                                </button>
                        </div>
                    </div>
                </div>
                <div className="back-btn mt-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div>
            </div>)
    }

}

const mapStateToProps = (state) => ({
    // regionList: state.region
})
export default connect(mapStateToProps, { getRegion })(ExecutivePerformance)
