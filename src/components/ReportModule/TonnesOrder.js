import React, { Component } from 'react'
import { path } from '../../constants';
import TreeSelect from 'react-do-tree-select';
import { getReportRegion, getProductList, getTonValue } from '../../actions/reportAction'
import { LineGraphView } from '../../shared/Reactgraphcharts'
import { toastr } from 'react-redux-toastr';

export default class TonnesOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            expiryDate: '',
            regionSelectVal: [],
            lineChartData: [],
            skuSelectValue: [],
            reset: true,
            deSelect: false,
            selectAll: { title: 'Select All', value: 'Select All' }
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
    dateChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
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
                    let value = item.split('Parent')
                    skuData.push(value[0])
                })
                let obj = {
                    'subRegionId': childArray,
                    'regionId': parentArray,
                    'productId': skuData,
                    'startDate': this.state.startDate,
                    'expiryDate': this.state.expiryDate,
                    'id': 3
                }
                getTonValue(obj).then(resp => {
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
    getProductData = (Data) => {
        let regionData = []
        Data && Data.map((item) => {
            if (item && !item.includes('Select All')) {
                regionData.push(item)
            }
        })
        let obj = {
            'dcCode': regionData
        }
        getProductList(obj).then(resp => {
            if (resp && resp.datas) {
                this.setState({ productList: resp.datas, deSelect: true })
            }
        })
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
        if (Data) {
            let dropDownValue = []
            Data && Data.map((item => {
                dropDownValue.push(item)
            }))
            this.setState({ skuSelectValue: dropDownValue })
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
    render() {
        let regionData = []
        this.state.regionListData2 ? regionData.push(this.state.selectAll) : regionData = []
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

        let productData = []
        this.state.productList && this.state.productList.map((item) => {
            let obj = {}
            if (item.name) {
                obj.title = item.name
                obj.value = item.productDetailsao.productId + 'Parent'
            }
            else {
                obj.title = item.title
                obj.value = item.value + 'ParentDAta'
            }
            productData.push(obj)
        })

        const skuResetData = [{ title: 'No Data', value: 'No Data' }]
        let chartData = []
        this.state.lineChartData.orderQuantity && this.state.lineChartData.orderQuantity.map((item, index) => {
            let regionName = "";
            let amount = 0
            item && item.regionDetails && item.regionDetails.map((regionList, regionIndex) => {
                if (regionIndex > 0) {
                    let data = regionList.split(',')

                    let amountValue = data && data[1] ? Number(data[1]) : 0
                    amount = amount + amountValue

                    let obj = {
                        name: data[0],
                        orderValue: data[1],
                        amount: amount
                        // regionName : data[1]
                        // lineName: regionName
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
        return (
            <div>
                <h4 className="user-title">{window.strings.REPORT.TOTALTONNESORDERED}</h4>
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
                        {chartData.length > 0 ? < div className="col-md-6 offset-md-3 mt-3">
                            <div className="main-wrapper d-flex justify-content-center">
                                <LineGraphView barChartData={chartData} /> </div>
                        </div> : <div className="record-box">  No Record Found </div>}
                    </div>
                </div>
                <div className="back-btn my-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div>
            </div>
        )
    }
}