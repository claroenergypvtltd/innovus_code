import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import TreeSelect from 'react-do-tree-select';
import { getRegion } from '../../actions/regionAction'
import { getSalesExecutiveGraphView, getReportRegion } from '../../actions/reportAction'
import { fetchReportGraph } from '../../actions/reportAction'
import { ReactBarLineChart, LineChartView } from '../../shared/Reactgraphcharts'
import GoogleMap from '../../shared/GoogleMap'
import { fetchSalesAgent } from '../../actions/salesAgentAction';
import { getDcCodeData } from '../../actions/salesAgentAction';
import { toastr } from 'react-redux-toastr'

class ExecutivePerformance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showlevel: 0,
            startDate: '',
            expiryDate: '',
            selectVal: [],
            selectVal1: [],
            lineChartData: [],
            errors: {},
            graphSubmit: false
        }
    }

    componentDidMount() {
        // this.getRegion();
        this.fetchAgents();
        this.getReportRegion();
    }

    componentWillReceiveProps(newProps) {
        // if (newProps && newProps.regionList && newProps.regionList.Lists && newProps.regionList.Lists.datas) {
        //     this.setState({ regionListData: newProps.regionList.Lists.datas })
        // }
    }

    // getRegion = () => {
    //     let obj = {
    //         page: '',
    //         rows: ''
    //     }
    //     this.props.getRegion(obj)
    // }

    getReportRegion = () => {
        let obj = {
            page: '',
            rows: ''
        }
        getReportRegion(obj).then(resp => {
            if (resp && resp.datas) {
                this.setState({ regionListData: resp.datas })
            }
        })
    }


    fetchAgents = () => {
        let obj = {
            roleId: 4,
            flag: 2,
            search: this.state.dcCode ? this.state.dcCode : ''
        }
        getDcCodeData(obj, "retailer").then(resp => {
            if (resp && resp) {
                this.setState({ salesAgentList: resp })
            }
        })
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
        this.setState({ selectVal: regionArray })
        // this.state.selectVal = regionArray
    }
    onChecked1 = (data, value) => {
        let regionArray1 = [];
        data.map(item => {
            if (!item.includes('parent')) {
                regionArray1.push(item);

            }
        })
        this.state.selectVal1 = regionArray1
    }

    getGraphView = () => {
        this.setState({ graphSubmit: true })
        if (this.state.startDate && this.state.expiryDate && this.state.selectVal.length > 0 && this.state.selectVal1.length > 0) {
            let obj = {
                startDate: this.state.startDate,
                expiryDate: this.state.expiryDate,
                regionData: this.state.selectVal,
                agentData: this.state.selectVal1,
            }
            // return httpServices.get('reports?Id=6&flag=0&expiryDate=' + Data.expiryDate + '&startDate=' + Data.startDate + '&subregionId=' + Data.regionData+'&agentId='+Data.agentData).then(resp => {

            getSalesExecutiveGraphView(obj).then(resp => {
                if (resp && resp.data) {
                    this.setState({ lineChartData: resp.data })
                    // let lineChartData = [{
                    //     "user": ["DC80,0", "DC81,3", "DC82,0", "DC70,0"], "orderValue": ["DC80,0", "DC81,32090", "DC82,0", "DC70,0"],
                    //     "order": ["DC80,0", "DC81,36", "DC82,0", "DC70,0"]
                    // }]
                    // this.setState({ lineChartData: lineChartData })
                }
            })
        } else {
            toastr.error("Mandatory Fields are missing");
        }

    }

    redirectPage = () => {
        this.props.history.push({ pathname: path.reports.list, state: { executivePerfomanceBack: 'executivePerfomanceSessionBack' } });
    }
    resetGraphSearch = () => {
        this.setState({
            startDate: "",
            expiryDate: "",
            selectVal1: [],
            selectVal: [],
            lineChartData: []
        });
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

        let agentData = []
        this.state.salesAgentList && this.state.salesAgentList.map((item) => {
            let Data = item.split(',');


            let obj = {
                title: Data[1],
                value: Data[0]
            }
            agentData.push(obj)
        })


        const checkbox = {
            enable: true,
            parentChain: true,              // child Affects parent nodes;
            childrenChain: true,            // parent Affects child nodes;
            halfChain: true,                // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.selectVal            // Initialize check multiple lists
        }
        const checkbox1 = {
            enable: true,
            parentChain: true,              // child Affects parent nodes;
            childrenChain: true,            // parent Affects child nodes;
            halfChain: true,                // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.selectVal1           // Initialize check multiple lists
        }
        let CustomerOnBoard = [];
        this.state.lineChartData && this.state.lineChartData.user && this.state.lineChartData.user.map(item => {
            let Data = item.split(',');
            let obj = {
                name: Data[0], Users: Data[1],
                // name: 'Page A', uv: 4000, pv: 2400, amt: 5000,
            }
            CustomerOnBoard.push(obj);
        })
        let noOfOrders = [];
        this.state.lineChartData && this.state.lineChartData.order && this.state.lineChartData.order.map(item => {
            let Data = item.split(',');
            let obj = {
                name: Data[0], Users: Data[1],
                // name: 'Page A', uv: 4000, pv: 2400, amt: 5000,
            }
            noOfOrders.push(obj);
        })

        let orderValue = [];

        this.state.lineChartData && this.state.lineChartData.orderValue && this.state.lineChartData.orderValue.map(item => {
            let Data = item.split(',');
            let obj = {
                name: Data[0], Users: Data[1],
                // name: 'Page A', uv: 4000, pv: 2400, amt: 5000,
            }
            orderValue.push(obj);
        })
        // let LineChatView = this.state.lineChartData && this.state.lineChartData.map(item => {

        // })


        return (
            <div className="customer-onboard">
                <h4 className="user-title">{window.strings.REPORT.SALES_EXECUTIVE_PERFORMANCE}</h4>
                <div className="sales-report mt-3">
                    <div className="main-wrapper pb-5 sale-box">
                        <div className="d-flex justify-content-around">
                            <div className="start-date">
                                <label className="label-title">Start Date * </label>
                                <input type="date" className="date-wrap form-control" value={this.state.startDate} onChange={this.dateChange} name="startDate" />
                                {/* {this.state.graphSubmit && !this.state.startDate && <div className="mandatory">{"Start Date " + window.strings['ISREQUIRED']}</div>} */}
                            </div>
                            <div className="end-date">
                                <label className="label-title">End Date * </label>
                                <input type="date" className="date-wrap form-control" value={this.state.expiryDate} onChange={this.dateChange} name="expiryDate" />
                                {/* {this.state.graphSubmit && !this.state.expiryDate && <div className="mandatory">{"End Date " + window.strings['ISREQUIRED']}</div>} */}
                            </div>

                            <div className="tree-box">
                                <label className="label-title">Select Region * </label>
                                {/* <input className="holder" placeholder="Search here.." /> */}
                                <TreeSelect
                                    treeData={treeData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.selectVal}
                                    onChecked={this.onChecked}
                                    checkbox={checkbox}
                                    customTitleRender={this.customTitleRender} />
                                {/* {this.state.graphSubmit && this.state.selectVal.length < 1 && <div className="mandatory">{"Region " + window.strings['ISREQUIRED']}</div>} */}
                            </div>
                            <div className="tree-box">
                                <label className="label-title">Sales Agent * </label>
                                {/* <input className="holder" placeholder="Search here.." /> */}
                                <TreeSelect
                                    treeData={agentData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.selectVal1}
                                    onChecked={this.onChecked1}
                                    checkbox={checkbox1}
                                    customTitleRender={this.customTitleRender} />
                                {/* {this.state.graphSubmit && this.state.selectVal1.length < 1 && <div className="mandatory">{"Region " + window.strings['ISREQUIRED']}</div>} */}
                            </div>
                        </div>
                        <div className="mr-5 pr-3 search-wrap">
                            <div className="view-box">
                                <button type="button" class="data-search" onClick={this.getGraphView}>
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
                    {CustomerOnBoard.length > 0 || noOfOrders.length > 0 || orderValue.length > 0 ? <div className="row mt-5">
                        <div className="col-md-6">
                            <div className="main-wrapper py-3">
                                {<LineChartView label='No of Customers Onboard' barChartData={CustomerOnBoard} />}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="main-wrapper py-3">
                                {<LineChartView label='No of Orders' barChartData={noOfOrders} />}
                            </div>
                        </div>
                        <div className="col-md-6 offset-md-3 mt-5">
                            <div className="main-wrapper py-3">
                                {<LineChartView label='Order Value' barChartData={orderValue} />}
                            </div>
                        </div>
                    </div> :
                        <div className="record-box">
                            No record found
                        </div>
                    }

                </div>
                <div className="back-btn my-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div>
            </div>)
    }

}

const mapStateToProps = (state) => ({
    regionList: state.region
})
export default connect(mapStateToProps, { getRegion, fetchSalesAgent, getSalesExecutiveGraphView })(ExecutivePerformance)
