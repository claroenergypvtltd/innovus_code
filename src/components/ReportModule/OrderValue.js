import React, { Component } from 'react'
import { path } from '../../constants';
import TreeSelect from 'react-do-tree-select';
import { getReportRegion, getProductList, getOrderValue } from '../../actions/reportAction'
import { LineGraphView } from '../../shared/Reactgraphcharts'
import { toastr } from 'react-redux-toastr';
import { getDcCodeData } from '../../actions/salesAgentAction';

export default class OrderValue extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            dateValue = today.getDate() >= 10 ? today.getDate() : ('0' + today.getDate()),
            monthValue = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1)),
            date = today.getFullYear() + '-' + monthValue + '-' + dateValue
        this.state = {
            startDate: '',
            expiryDate: '',
            regionSelectVal: [],
            skuSelectValue: [],
            lineChartData: [],
            reset: true,
            skuReset: true,
            deSelect: false,
            productList: [],
            selectAll: { title: 'Select All', value: 'Select All' },
            dateValidation: date
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
    getProductData = (Data) => {
        let regionData = []
        Data && Data.map((item) => {
            if (item && !item.includes('Select All') && !item.includes("Parent")) {
                regionData.push(item)
            }
        })
        let obj = {
            roleId: 4,
            flag: 5,
            search: regionData
        }
        getDcCodeData(obj, "order").then(resp => {
            if (resp) {
                this.setState({ productList: resp, deSelect: true })
            }
        })
    }
    dateChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.reports.list, state: { executivePerfomanceBack: 'executivePerfomanceSessionBack' } });
    }
    onReset = () => {
        this.setState({
            startDate: "",
            expiryDate: "",
            regionSelectVal: [],
            lineChartData: [],
            skuSelectValue: [],
            deSelect: false
        });
    }
    onRegionChecked = (Data) => {
        let enter;
        Data && Data.map(item => {
            enter = item == 'Select All' ? true : false
        })
        if (enter) {
            this.onSelectAll()
        }
        else if (!Data.includes('Select All') && !this.state.reset) {
            this.setState({ regionSelectVal: [], skuSelectValue: [], reset: true, deSelect: false })
        }
        else {
            let regionArray = [];
            Data && Data.map(item => {
                // if (!item.includes('Parent')) {
                regionArray.push(item);
                // }
            })
            let resetStatus = regionArray.includes('Select All') ? false : true
            this.state.regionSelectVal = regionArray
            this.setState({ regionSelectVal: regionArray, reset: resetStatus, deSelect: false })
            if (Data.length > 0) {
                this.getProductData(regionArray)
            }
            else {
                this.setState({ skuSelectValue: [], deSelect: false })
            }
        }
    }
    onSkuChecked = (Data) => {
        let enter;
        Data && Data.map(item => {
            enter = item == 'Select All' ? true : false
        })
        if (enter) {
            this.onSkuSelectAll(Data)
        }
        else if (!Data.includes('Select All') && !this.state.skuReset) {
            this.setState({ skuSelectValue: [], skuReset: true, deSelect: false }, () => { this.getProductData(this.state.regionSelectVal) })
        }
        else {
            let dropDownValue = []
            Data && Data.map((item => {
                dropDownValue.push(item)
            }))
            let resetStatus = dropDownValue && dropDownValue.includes('Select All') ? false : true
            this.setState({ skuSelectValue: dropDownValue, skuReset: resetStatus })
        }
    }
    onSkuSelectAll = (Data) => {
        if (Data.includes('Select All')) {
            let dataArray = ['Select All']
            this.state.productList && this.state.productList.map((item) => {
                let productData = item.split(',')
                let value = productData[2]
                dataArray.push(value)
            })
            this.onSkuChecked(dataArray)
        }
    }
    onSelectAll = () => {
        let childArray = ['Select All'];
        this.state.regionListData2 && this.state.regionListData2.map((item, index) => {
            item.dcDatas && item.dcDatas.map((dcData, index) => {
                let obj = dcData.dcCode
                childArray.push(obj)
            })

            let obj = item.id + 'Parent'
            childArray.push(obj)
        })
        this.onRegionChecked(childArray)
    }
    getGraphData = () => {
        if (this.state.startDate && this.state.expiryDate && this.state.regionSelectVal.length > 0 && this.state.skuSelectValue.length > 0) {
            if (this.state.startDate <= this.state.expiryDate) {
                let childArray = []
                let parentArray = []
                this.state.regionSelectVal && this.state.regionSelectVal.map((item) => {
                    if (item.includes("Parent")) {
                        let data = item.split('Parent')
                        parentArray.push(data[0])
                    }
                    if (!item.includes("Parent")) {
                        childArray.push(item)
                    }
                })
                let skuData = []
                this.state.skuSelectValue && this.state.skuSelectValue.map((item) => {
                    let agentList = item
                    let agentName = []
                    agentName = skuData && skuData.map((agentItem) => {
                        return agentItem
                    })
                    if (item != 'Select All' && agentName && !agentName.includes(agentList)) {
                        let value = item.split('Parent')
                        skuData.push(value[0])
                    }
                })
                let obj = {
                    'subRegionId': childArray,
                    'regionId': parentArray,
                    'productId': skuData,
                    'startDate': this.state.startDate,
                    'expiryDate': this.state.expiryDate,
                    'id': 3
                }
                getOrderValue(obj).then(resp => {
                    if (resp && resp.data) {
                        this.setState({ lineChartData: resp.data })
                    }
                })
            }
            else {
                toastr.error("Invalid Date")
            }
        }
        else {
            toastr.error("Mandatory Fields are Mising")
        }
    }
    render() {
        let regionData = []
        this.state.regionListData2 && this.state.regionListData2.length > 0 ? regionData.push(this.state.selectAll) : regionData = []
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
                value: item.id + 'Parent',
                children: childArray
            }
            regionData.push(obj)
        })

        let productData = this.state.productList.length > 0 ? [this.state.selectAll] : []
        this.state.productList && this.state.productList.map((item, index) => {
            let Data = item.split(',')
            let productList = Data[4] + ' - ' + Data[3]
            let productName = []
            productName = productData && productData.map((productItem) => {
                return productItem.title
            })
            if (!productName.includes(productList)) {
                let Data = item.split(',');
                let obj = {
                    title: Data[4] + ' - ' + Data[3],
                    value: Data[2]
                }
                productData.push(obj)
            }
        })

        const skuResetData = [{ title: 'No data', value: 'No data' }]

        let chartData = []
        this.state.lineChartData.orderValue && this.state.lineChartData.orderValue.map((item, index) => {

            let regionName = "";
            item && item.regionDetails && item.regionDetails.map((regionList, regionIndex) => {
                if (regionIndex > 0) {
                    let data = regionList.split(',')

                    let obj = {
                        name: data[0],
                        orderValue: data[1],
                        amount: Math.max(Number(data[1]))
                    }
                    obj[`${regionName}`] = data[1];
                    chartData.push(obj)
                }
                else {
                    let obj = {
                        region: regionList,
                    }
                    regionName = obj.region
                    chartData.push(obj)
                }
            })

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
            initCheckedList: this.state.skuSelectValue           // Initialize check multiple lists
        }
        let showChart = false
        chartData && chartData.map(item => {
            if (item.orderValue && item.amount) {
                showChart = true;
            }
        })


        return (
            <div>
                <h4 className="user-title">{window.strings.REPORT.ORDERVALUEINR}</h4>
                <div className="mt-3">
                    <div className="main-wrapper py-3 sale-box">
                        <div className="d-flex justify-content-around">
                            <div className="start-date">
                                <label className="label-title">Start Date * </label>
                                <input type="date" className="date-wrap form-control" value={this.state.startDate} onChange={this.dateChange} max={this.state.dateValidation} name="startDate" />
                            </div>
                            <div className="end-date">
                                <label className="label-title">End Date * </label>
                                <input type="date" className="date-wrap form-control" value={this.state.expiryDate} onChange={this.dateChange} max={this.state.dateValidation} name="expiryDate" />
                            </div>

                            {!this.state.deSelect && <div className="tree-box">
                                <label className="label-title">Select Region * </label>
                                <TreeSelect
                                    treeData={regionData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.regionSelectVal}
                                    onChecked={this.onRegionChecked}
                                    checkbox={regionCheckbox}
                                    customTitleRender={this.customTitleRender} />
                            </div>}
                            {this.state.deSelect && <div className="tree-box">
                                <label className="label-title">Select Region * </label>
                                <TreeSelect
                                    treeData={regionData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.regionSelectVal}
                                    onChecked={this.onRegionChecked}
                                    checkbox={regionCheckbox}
                                    customTitleRender={this.customTitleRender} />
                            </div>}
                            {!this.state.deSelect && <div className="tree-box">
                                <label className="label-title">Select SKU * </label>
                                <TreeSelect
                                    treeData={skuResetData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.skuSelectValue}
                                    onChecked={this.onSkuChecked}
                                    // checkbox={skuCheckbox}
                                    customTitleRender={this.customTitleRender} />
                            </div>}
                            {this.state.deSelect && <div className="tree-box">
                                <label className="label-title">Select SKU * </label>
                                <TreeSelect
                                    treeData={productData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.skuSelectValue}
                                    onChecked={this.onSkuChecked}
                                    checkbox={skuCheckbox}
                                    customTitleRender={this.customTitleRender} />
                            </div>}
                        </div>
                        <div className="mr-5 pr-3 search-wrap">
                            <div className="view-box">
                                <button type="button" class="data-search" onClick={this.getGraphData}>
                                    <i class="fa fa-search" aria-hidden="true"></i>Search
                            </button>
                            </div>
                            <div className="retail-reset">
                                <button type="button" className="reset ml-1" onClick={this.onReset}>
                                    <i className="fa fa-refresh" aria-hidden="true"></i>
                                    <span className="tooltip-text">Reset</span>
                                </button>
                            </div>
                        </div>
                        {chartData.length > 0 && showChart ? < div className="mt-3">
                            <div className="d-flex justify-content-center">
                                <LineGraphView barChartData={chartData} label='Date' yAxis='Order Value (INR)' /> </div>
                        </div> : <div className="record-box">  No Record Found </div>}
                    </div>
                </div>
                <div className="back-btn my-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div>
            </div >
        )
    }
}