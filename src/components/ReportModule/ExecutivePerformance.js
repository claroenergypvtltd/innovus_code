import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import TreeSelect from 'react-do-tree-select';
import { getRegion } from '../../actions/regionAction'
import { getSalesExecutiveGraphView, getReportRegion } from '../../actions/reportAction'
import { fetchReportGraph } from '../../actions/reportAction'
import { ReactBarLineChart, LineGraphView } from '../../shared/Reactgraphcharts'
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
            selectsubVal: [],
            selectVal1: [],
            lineChartData: [],
            subRegionData: [],
            errors: {},
            salesAgentList: [],
            graphSubmit: false,
            salesEnable: true,
            subEnable: true,
            skuReset: true
        }
    }

    componentDidMount() {
        // this.fetchAgents();
        this.getReportRegion();
    }


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

    fetchAgents = (Data) => {
        let dcList = []
        Data && Data.map((item) => {
            let splitData = item.split('##');
            let subRegionVal = splitData[0];
            dcList.push(subRegionVal)
        })
        let obj = {
            roleId: 4,
            flag: 5,
            search: dcList
        }
        getDcCodeData(obj, "order").then(resp => {
            if (resp) {
                this.setState({ salesAgentList: resp, salesEnable: false })
            }
        })
    }

    dateChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChecked = (data, value) => {
        let regionArray = [];
        data.map(item => {
            regionArray.push(item);
        })
        this.setState({ selectVal: regionArray, subEnable: false })

        if (data && data[0]) {
            let Data = data[0].split('##');
            let subRegionData = JSON.parse(Data[1]);
            this.setState({ subRegionData, selectsubVal: [] })
        } else {
            this.setState({ subRegionData: [{ "title": "No Data", "value": "No Data" }], salesAgentList: [{ "title": "No Data", "value": "No Data,No Data" }], subEnable: true, salesEnable: true, selectsubVal: [], selectVal1: [] })
        }
    }

    onCheckedSub = (data) => {
        let regionArray = [];
        data.map(item => {
            regionArray.push(item);
        })
        if (data && data[0]) {
            this.setState({ selectsubVal: regionArray, salesEnable: false }, () => {
                this.fetchAgents(this.state.selectsubVal)
            })
        }
        else {
            this.setState({ selectsubVal: [], salesAgentList: [{ "title": "No Data", "value": "No Data,No Data" }], selectVal1: [], subEnable: false, salesEnable: true })
        }

    }

    onChecked1 = (Data) => {
        let enter;
        Data && Data.map(item => {
            enter = item == 'Select All' ? true : false
        })
        if (enter) {
            this.onSkuSelectAll(Data)
        }
        else if (!Data.includes('Select All') && !this.state.skuReset) {
            this.setState({ selectVal1: [], skuReset: true, salesEnable: true }, () => { this.fetchAgents(this.state.selectsubVal) })
        }
        else {
            let dropDownValue = []
            Data && Data.map((item => {
                dropDownValue.push(item)
            }))
            let resetStatus = dropDownValue && dropDownValue.includes('Select All') ? false : true
            this.setState({ selectVal1: dropDownValue, skuReset: resetStatus })
        }
    }
    onSkuSelectAll = (Data) => {
        if (Data.includes('Select All')) {
            let dataArray = ['Select All']
            this.state.salesAgentList && this.state.salesAgentList.map((item) => {
                let productData = item.split(',')
                let value = productData[0]
                dataArray.push(value)
            })
            this.onChecked1(dataArray)
        }
    }
    getGraphView = () => {
        this.setState({ graphSubmit: true })
        if (this.state.startDate && this.state.expiryDate && this.state.selectVal.length > 0 && this.state.selectsubVal.length > 0 && this.state.selectVal1.length > 0) {

            let subRegionVal = "";

            this.state.selectsubVal && this.state.selectsubVal.map(item => {
                if (item) {
                    let splitData = item.split('##');
                    subRegionVal = splitData[0];
                }
            })
            let selectVal1 = [];
            this.state.selectVal1 && this.state.selectVal1.map(item => {
                let agentList = item
                let agentName = []
                agentName = selectVal1 && selectVal1.map((agentItem) => {
                    return agentItem
                })
                if (!agentName.includes(agentList) && !item.includes('Select All')) {
                    selectVal1.push(item);
                }

            })

            let obj = {
                startDate: this.state.startDate,
                expiryDate: this.state.expiryDate,
                regionData: subRegionVal,
                agentData: selectVal1,
            }

            getSalesExecutiveGraphView(obj).then(resp => {
                if (resp && resp.data) {
                    this.setState({ lineChartData: resp.data })
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
            lineChartData: [],
            selectsubVal: [],
            salesAgentList: [],
            subRegionData: [],
            salesEnable: true,
            subEnable: true

        });
    }
    render() {
        let treeData = []
        this.state.regionListData && this.state.regionListData.map((item, index) => {
            let obj = {}
            let selectedVal = '';
            this.state.selectVal && this.state.selectVal.map(selectedItem => {
                if (selectedItem) {
                    selectedVal = selectedItem;
                }
            })
            let childArray = [];
            item.dcDatas && item.dcDatas.map((dcData, index) => {
                let obj = {
                    title: dcData.name,
                    value: dcData.dcCode,
                }
                childArray.push(obj)
            })
            if (selectedVal) {
                if ((item.id + 'Parent##' + JSON.stringify(childArray) == selectedVal)) {
                    obj = {
                        title: item.name,
                        value: item.id + 'Parent##' + JSON.stringify(childArray),
                        // disabled: true
                    }
                } else {
                    obj = {
                        title: item.name,
                        value: item.id + 'Parent##' + JSON.stringify(childArray),
                        disabled: true
                    }
                }
            } else {
                obj = {
                    title: item.name,
                    value: item.id + 'Parent##' + JSON.stringify(childArray)
                }
            }
            treeData.push(obj)
        })

        let subtreeData = []
        this.state.subRegionData && this.state.subRegionData.map((item, index) => {
            let obj = {}
            let selectedVal = '';
            this.state.selectsubVal && this.state.selectsubVal.map(selectedItem => {
                if (selectedItem) {
                    selectedVal = selectedItem;
                }
            })
            if (selectedVal) {
                if ((item.value + '##Parent' == selectedVal)) {
                    obj = {
                        title: item.title,
                        value: item.value + '##Parent',
                    }
                } else {
                    obj = {
                        title: item.title,
                        value: item.value + '##Parent',
                        disabled: true
                    }
                }
            } else {
                obj = {
                    title: item.title,
                    value: item.value + '##Parent'
                }
            }
            subtreeData.push(obj)
        })

        let subResetTreeData = [{ title: 'No data', value: 'No data' }]

        let agentData = [{ title: 'Select All', value: 'Select All' }]
        this.state.salesAgentList && this.state.salesAgentList.map((item, index) => {
            if (item) {
                let Data;
                if (item.value) {
                    Data = item.value.split(',');
                } else {
                    Data = item.split(',');
                }
                let agentList = Data[1]
                let agentName = []
                agentName = agentData && agentData.map((agentItem) => {
                    return agentItem.title
                })
                if (!agentName.includes(agentList)) {
                    let obj = {
                        title: Data[1],
                        value: Data[0]
                    }
                    agentData.push(obj)
                }
            }
        })

        let agentResetData = [{ title: 'No data', value: 'No data' }]

        const checkbox = {
            enable: true,
            parentChain: true,              // child Affects parent nodes;
            childrenChain: true,            // parent Affects child nodes;
            halfChain: true,                // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.selectVal            // Initialize check multiple lists
        }

        const subcheckbox = {
            enable: true,
            parentChain: true,              // child Affects parent nodes;
            childrenChain: true,            // parent Affects child nodes;
            halfChain: true,                // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.selectsubVal            // Initialize check multiple lists
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
            let regionName = "";
            item && item.usersCount.map((userList, userIndex) => {

                if (userIndex > 1) {
                    let value = userList.split(',')
                    let obj = {
                        name: value[0],
                        amount: value[1]
                    }
                    obj[`${regionName}`] = value[1];
                    CustomerOnBoard.push(obj)
                }
                else {
                    if (userIndex == 0) {
                        let obj = {
                            region: userList
                        }
                        regionName = obj.region
                        CustomerOnBoard.push(obj)
                    }
                }
            })

        })
        let noOfOrders = [];
        this.state.lineChartData && this.state.lineChartData.order && this.state.lineChartData.order.map(item => {
            let regionName = "";
            item && item.ordersCount && item.ordersCount.map((userList, userIndex) => {
                if (userIndex > 1) {
                    let value = userList.split(',')
                    let obj = {
                        name: value[0],
                        amount: value[1]
                        // orderValue: value[1]
                    }
                    obj[`${regionName}`] = value[1];
                    noOfOrders.push(obj)
                }
                else {
                    if (userIndex == 0) {
                        let obj = {
                            region: userList
                        }
                        regionName = obj.region
                        noOfOrders.push(obj)
                    }
                }
            })
        })

        let orderValue = [];

        this.state.lineChartData && this.state.lineChartData.orderValue && this.state.lineChartData.orderValue.map(item => {
            let regionName = "";
            item && item.ordersValue && item.ordersValue.map((userList, userIndex) => {
                if (userIndex > 1) {
                    let value = userList.split(',')
                    let obj = {
                        name: value[0],
                        amount: value[1]
                        // orderValue: value[1]
                    }
                    obj[`${regionName}`] = value[1];
                    orderValue.push(obj)
                }
                else {
                    if (userIndex == 0) {
                        let obj = {
                            region: userList
                        }
                        regionName = obj.region
                        orderValue.push(obj)
                    }
                }
            })
        })
        return (
            <div className="customer-onboard">
                <h4 className="user-title">{window.strings.REPORT.SALES_EXECUTIVE_PERFORMANCE}</h4>
                <div className="sales-report mt-3">
                    <div className="main-wrapper py-3 sale-box">
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

                            {this.state.subEnable && <div className="tree-box">
                                <label className="label-title">Select Sub Region * </label>
                                <TreeSelect
                                    treeData={subResetTreeData}
                                    style={{ width: 210, height: 100 }}
                                />
                            </div>}

                            {!this.state.subEnable && <div className="tree-box">
                                <label className="label-title">Select Sub Region * </label>
                                <TreeSelect
                                    treeData={subtreeData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.selectsubVal}
                                    onChecked={this.onCheckedSub}
                                    checkbox={subcheckbox}
                                    customTitleRender={this.customTitleRender} />
                                {/* {this.state.graphSubmit && this.state.selectVal.length < 1 && <div className="mandatory">{"Region " + window.strings['ISREQUIRED']}</div>} */}
                            </div>}


                            {this.state.salesEnable && <div className="tree-box">
                                <label className="label-title">Sales Agent * </label>
                                <TreeSelect
                                    treeData={agentResetData}
                                    style={{ width: 210, height: 100 }}
                                />
                            </div>}

                            {!this.state.salesEnable && <div className="tree-box">
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
                            }
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
                                {<LineGraphView label='Date' Data='Users' yAxis="" barChartData={CustomerOnBoard} />}
                                <label className="d-flex justify-content-center mt-2">No of customers</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="main-wrapper py-3">
                                {<LineGraphView label='Date' Data='Order' yAxis="" barChartData={noOfOrders} />}
                                <label className="d-flex justify-content-center mt-2">No of orders</label>
                            </div>
                        </div>
                        <div className="col-md-6 offset-md-3 mt-5">
                            <div className="main-wrapper py-3">
                                {<LineGraphView label='Date' Data='Value' yAxis="" barChartData={orderValue} />}
                                <label className="d-flex justify-content-center mt-2">INR</label>
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
