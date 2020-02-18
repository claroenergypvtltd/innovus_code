import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import TreeSelect from 'react-do-tree-select';
import { getReportRegion, getProductList, getOrderValue } from '../../actions/reportAction'
import { LineChartView } from '../../shared/Reactgraphcharts'
import { toastr } from 'react-redux-toastr';
import { getPriceList } from '../../actions/priceAction'

class OrderValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showlevel: 0,
            startDate: '',
            expiryDate: '',
            regionSelectVal: [],
            skuSelectValue: [],
            lineChartData: [],
            errors: {},
            graphSubmit: false,
            reset: true,
            deSelect: false,
            productList: [],
            selectAll: {
                title: 'Select All',
                value: 'Select All'
            }
        }
    }
    componentDidMount() {
        this.getReportRegion();
        // this.getPriceList();
    }
    componentWillReceiveProps(newProps) {
        if (newProps.priceData && newProps.priceData.Lists && newProps.priceData.Lists.datas) {
            let respData = newProps.priceData.Lists.datas;
            this.setState({ PriceLists: respData })
        }
    }
    // getPriceList() {
    //     let obj = {
    //         pages: '',
    //         rows: ''
    //     }
    //     this.props.getPriceList(obj)
    // }
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
        let obj = {
            'dcCode': Data
        }
        getProductList(obj).then(resp => {
            if (resp && resp.datas) {
                this.setState({ productList: resp.datas })
            }
        })
    }
    dateChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    getGraphData = () => {
        if (this.state.startDate && this.state.expiryDate && this.state.regionSelectVal.length > 0 && this.state.skuSelectValue.length > 0) {
            if (this.state.startDate <= this.state.expiryDate) {
                let regionData = []
                this.state.regionSelectVal && this.state.regionSelectVal.map((item) => {
                    if (item && !item.includes('Select All')) {
                        regionData.push(item)
                    }
                })
                let obj = {
                    'subRegionId': regionData,
                    'productId': this.state.skuSelectValue
                }
                getOrderValue(obj).then(resp => {

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
            deSelect: true
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
            this.setState({ regionSelectVal: [], reset: true, deSelect: true })

        }
        else {
            let regionArray = [];
            Data && Data.map(item => {
                if (!item.includes('Parent')) {
                    regionArray.push(item);
                }
            })
            let resetStatus = regionArray.includes('Select All') ? false : true
            this.state.regionSelectVal = regionArray
            if (this.state.regionSelectVal.length > 0) {
                this.getProductData(regionArray)
            }
            this.setState({ regionSelectVal: regionArray, reset: resetStatus, deSelect: false })
        }

    }
    onSkuChecked = (Data) => {
        if (Data) {
            let dropDownValue = []
            Data && Data.map((item => {
                dropDownValue.push(item)
            }))
            this.state.skuSelectValue = dropDownValue
            // this.setState({ skuSelectValue: dropDownValue })
        }
    }
    onSelectAll = () => {
        let childArray = ['Select All'];
        this.state.regionListData2 && this.state.regionListData2.map((item, index) => {
            item.dcDatas && item.dcDatas.map((dcData, index) => {
                let obj = dcData.dcCode
                childArray.push(obj)
            })

            let obj = item.name + 'Parent'
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
                value: item.name + 'Parent',
                children: childArray
            }
            regionData.push(obj)
        })
        let productData = []
        this.state.productList && this.state.productList.map((item) => {

            let obj = {
                title: item.name,
                value: item && item.productDetailsao && item.productDetailsao.productId
            }
            productData.push(obj)
        })
        let productResetData = []
        this.state.productList && this.state.productList.map((item) => {

            let obj = {
                title: item.name,
                value: item && item.productDetail && item.productDetail.productId
            }
            productResetData.push(obj)
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
                                    treeData={!this.state.deSelect ? productData : productResetData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.skuSelectValue}
                                    onChecked={this.onSkuChecked}
                                    checkbox={skuCheckbox}
                                    customTitleRender={this.customTitleRender} />
                            </div>}
                            {this.state.deSelect && <div className="tree-box">
                                <label className="label-title">Select SKU * </label>
                                <TreeSelect
                                    treeData={productResetData}
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
const mapStateToProps = (state) => ({
    priceData: state.price ? state.price : {}
})
export default connect(mapStateToProps, { getPriceList })(OrderValue)