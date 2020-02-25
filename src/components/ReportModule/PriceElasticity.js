import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import TreeSelect from 'react-do-tree-select';
import { getRegion } from '../../actions/regionAction'
import { getReportRegion, getPriceElasticityGraphView } from '../../actions/reportAction'
import { fetchReportGraph } from '../../actions/reportAction'
import { ReactBarLineChart } from '../../shared/Reactgraphcharts'
import GoogleMap from '../../shared/GoogleMap'
import { fetchSalesAgent } from '../../actions/salesAgentAction';
import { getProductList } from '../../actions/reportAction';
import { toastr } from 'react-redux-toastr'

class PriceElasticity extends Component {
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
            check: false,
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
            dcCode: dcList
        }
        getProductList(obj).then(resp => {
            if (resp && resp.datas) {
                this.setState({ salesAgentList: resp.datas })
            }
        })
    }

    dateChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChecked = (data, value) => {
        let regionArray = [];
        data.map((item, index) => {
            if (data.length - 1 == index) {
                regionArray.push(item);
            }
        })
        this.setState({ selectVal: regionArray, subEnable: false, salesEnable: false })

        if (regionArray && regionArray[0]) {
            let Data = regionArray[0].split('##');
            let subRegionData = JSON.parse(Data[1]);
            this.setState({ subRegionData, selectsubVal: [] })
        } else {
            this.setState({ subRegionData: [{ "title": "No Data", "value": "No Data" }], salesAgentList: [{ "name": "No Data", "id": "No Data" }], subEnable: true, salesEnable: true, selectsubVal: [], selectVal1: [] })
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
            this.setState({ selectsubVal: [], salesAgentList: [{ "name": "No Data", "id": "No Data" }], selectVal1: [], subEnable: false, salesEnable: true })

        }

    }

    onChecked1 = (data, value) => {
        let regionArray1 = [];
        data.map(item => {
            // if (item.includes('parent')) {
            regionArray1.push(item);
            // }
        })
        this.setState({ selectVal1: regionArray1, check: true, })
        // this.state.selectVal1 = regionArray1
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

            let selectVal1arry = []

            this.state.selectVal1 && this.state.selectVal1.map(item => {
                if (item) {
                    let splitData = item.split('##');
                    selectVal1arry.push(splitData[0]);
                }
            })
            let obj = {
                startDate: this.state.startDate,
                expiryDate: this.state.expiryDate,
                regionData: subRegionVal,
                productId: selectVal1arry,

            }

            getPriceElasticityGraphView(obj).then(resp => {
                if (resp && resp.data && resp.data.orderPrice && resp.data.orderPrice) {
                    this.setState({ lineChartData: resp.data.orderPrice })
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
            subRegionData: [],
            salesAgentList: [],
            subEnable: true, salesEnable: true
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

        let agentData = []
        this.state.salesAgentList && this.state.salesAgentList.map((item, index) => {
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

            agentData.push(obj)
        })




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
        this.state.lineChartData && this.state.lineChartData.map((item, index) => {
            if (index == 0) {
                item.regionDetails && item.regionDetails.map((regionItem, regionIndex) => {
                    if (regionIndex > 0) {
                        let Data = regionItem.split(',');
                        let obj = {
                            name: Data[0], Price: Data[1], "Tones Ordered": Data[2]
                        }
                        CustomerOnBoard.push(obj);
                    }
                })
            }
        })

        return (
            <div className="customer-onboard">
                <h4 className="user-title">{window.strings.REPORT.PRICEELASTICITY}</h4>
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
                                    treeData={subtreeData}
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
                                <label className="label-title">Select SKU *  </label>
                                <TreeSelect
                                    treeData={agentData}
                                    style={{ width: 210, height: 100 }}
                                />
                            </div>}

                            {!this.state.salesEnable && <div className="tree-box">
                                <label className="label-title">Select SKU * </label>
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
                        {CustomerOnBoard.length > 0 ? <div>
                            <div className="mt-3">
                                <div className="d-flex justify-content-center">
                                    {/* {<LineChartView label='No of Customers Onboard' Data='Users' barChartData={CustomerOnBoard} />} */}

                                    <ReactBarLineChart barChartData={CustomerOnBoard} barKey="Price" lineKey="Tones Ordered" />
                                    <label className="d-flex justify-content-center">Price Elasticity</label>
                                </div>
                            </div>
                        </div> :
                            <div className="record-box">
                                No record found
                        </div>
                        }
                    </div>
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
export default connect(mapStateToProps, { getRegion, fetchSalesAgent, getPriceElasticityGraphView })(PriceElasticity)
