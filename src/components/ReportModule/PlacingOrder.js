import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import GoogleMap from '../../shared/GoogleMap'
import { ReactBarLineChart } from '../../shared/Reactgraphcharts'
import { fetchOrderGraph, fetchOrderMap } from '../../actions/reportAction'
import TreeSelect from 'react-do-tree-select';
import { getReportRegion } from '../../actions/reportAction'
import { toastr } from 'react-redux-toastr';
import { getDcCodeData } from '../../actions/salesAgentAction';

class PlacingOrder extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            dateValue = today.getDate() >= 10 ? today.getDate() : ('0' + today.getDate()),
            monthValue = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1)),
            date = today.getFullYear() + '-' + monthValue + '-' + dateValue
        this.state = {
            errors: {},
            mapStartDate: '',
            graphStartDate: '',
            regionId: '',
            mapSelectVal: [],
            graphSelectVal: [],
            getBarChart: false,
            subRegionBarData: [],
            graphData: [],
            mapData: [],
            agentSelectVal: [],
            agentDataList: [],
            regionListData2: [],
            selectAll: { title: 'Select All', value: 'Select All' },
            agentDropDown: false,
            reset: true,
            dateValidation: date
        }
    }
    componentDidMount() {
        this.getRegionList()
        if (this.props.view == "map") {
            this.setState({ map: true })
        }
        if (this.props.view == "graph") {
            this.setState({ graph: true })
        }
    }
    fetchAgents = (Data) => {
        let dcList = []
        Data && Data.map((item) => {
            if (item && !item.includes('Parent') && !item.includes('Select All')) {
                dcList.push(item)
            }
        })
        let obj = {
            roleId: 4,
            flag: 5,
            search: dcList
        }
        getDcCodeData(obj, "order").then(resp => {
            if (resp) {
                this.setState({ agentDataList: resp, agentDropDown: true })
            }
        })
    }
    getRegionList = () => {
        let obj = {
            page: '',
            rows: ''
        }
        getReportRegion(obj).then(resp => {
            this.setState({ regionListData2: resp && resp.datas })
        })
    }
    getPlacingOrderGraph = () => {
        if ((!this.state.graphStartDate) || this.state.graphSelectVal.length == 0) {
            toastr.error("Mandatory fields are missing")
        }
        let value = []
        let data = {}
        this.state.graphSelectVal && this.state.graphSelectVal.map((item => {
            data = item.split('-')
            value.push(data[0])
        }))
        if (this.state.graphStartDate && this.state.graphSelectVal.length > 0) {
            let obj = {
                startDate: this.state.graphStartDate,
                id: 2,
                regionId: value
            }
            fetchOrderGraph(obj).then(resp => {
                if (resp && resp.data) {
                    this.setState({ graphData: resp.data })
                }
            })
        }
    }
    getPlacingOrderMap = () => {
        if ((!this.state.mapStartDate) || this.state.mapSelectVal.length == 0 || this.state.agentSelectVal.length == 0) {
            toastr.error("Mandatory fields are missing")
        }

        let mapSelectVal = []
        this.state.mapSelectVal && this.state.mapSelectVal.map(item => {
            if (item) {
                if (!item.includes('Parent') && !item.includes('Select All')) {
                    mapSelectVal.push(item);
                }
            }
        })
        if (this.state.mapStartDate && this.state.mapSelectVal.length > 0 && this.state.agentSelectVal.length > 0) {
            let obj = {
                startDate: this.state.mapStartDate,
                id: 2,
                regionId: this.state.mapSelectVal,
                agentId: this.state.agentSelectVal
            }
            fetchOrderMap(obj).then(resp => {
                if (resp && resp.data) {
                    this.setState({ mapData: resp.data })
                }
            })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.reports.list })
    }
    onMapChecked = (Data) => {
        let enter;
        Data && Data.map(item => {
            enter = item == 'Select All' ? true : false
        })
        if (enter) {
            this.onSelectAll()
        }
        else if (!Data.includes('Select All') && !this.state.reset) {
            this.setState({ mapSelectVal: [], agentSelectVal: [], reset: true, agentDropDown: false })
        }
        else {
            let regionArray = []
            Data && Data.map((item => {
                // if (!item.includes('Parent')) {
                regionArray.push(item)
                // }
            }))
            let resetStatus = regionArray.includes('Select All') ? false : true
            this.state.mapSelectVal = regionArray
            this.setState({ agentDropDown: true, reset: resetStatus })
            if (Data && Data.length > 0) {
                this.fetchAgents(Data)
            }
            else {
                this.setState({ agentDropDown: false, agentSelectVal: [], }, () => {
                    this.getRegionList()
                })
            }
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
        this.onMapChecked(childArray)
    }
    onGraphChecked = (Data) => {
        if (Data) {
            let dropDownValue = []
            Data && Data.map((item => {
                // let value = item.split('-')
                dropDownValue.push(item)

            }))
            this.setState({ graphSelectVal: dropDownValue, check: true })
        }
    }
    onAgentChecked = (Data) => {
        if (Data) {
            let dropDownValue = []
            Data && Data.map((item => {
                dropDownValue.push(item)
            }))
            this.state.agentSelectVal = dropDownValue
        }
    }
    callbackFunction = (childData, selectBarData) => {
        let subBarData = [];
        subBarData.push(selectBarData && selectBarData.payload)
        this.setState({ getBarChart: childData, subRegionBarData: subBarData })
    }
    hideSubBarChart = () => {
        this.setState({ getBarChart: false })
    }
    resetMapSearch = () => {
        this.setState({
            reset: true,
            mapStartDate: "",
            mapSelectVal: [],
            agentSelectVal: [],
            mapData: [],
            agentDropDown: false,
            agentDataList: []
        });
    }
    resetGraphSearch = () => {
        this.setState({
            graphStartDate: "",
            graphSelectVal: [],
            graphData: []
        });
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
        const agentCheckBox = {
            enable: true,
            parentChain: true, // child Affects parent nodes;
            childrenChain: true, // parent Affects child nodes;
            halfChain: true, // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: this.state.agentSelectVal // Initialize check multiple lists
        }

        let regionData = []
        this.state.regionListData2 && this.state.regionListData2.length > 0 ? regionData.push(this.state.selectAll) : regionData = []
        // regionData.push({ title: 'Select All', name: 'Select All' })
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

        let regionData1 = []
        this.state.regionListData2 && this.state.regionListData2.map((item) => {
            let obj = {}

            let selectedVal = '';


            this.state.graphSelectVal && this.state.graphSelectVal.map(selectedItem => {
                if (selectedItem) {
                    selectedVal = selectedItem;
                }
            })

            if (selectedVal) {

                if ((item.id + '-ParentData' == selectedVal) && this.state.check) {
                    obj = {
                        title: item.name,
                        value: item.id + '-ParentData',
                        // disabled: true
                    }
                } else {
                    obj = {
                        title: item.name,
                        value: item.id + '-ParentData',
                        disabled: true
                    }
                }
            } else {
                obj = {
                    title: item.name,
                    value: item.id + '-ParentData',
                }
            }
            regionData1.push(obj)
        })

        let agentData = []
        this.state.agentDataList && this.state.agentDataList.map((item, index) => {
            let Data = item.split(',');
            let agentList = Data[1] + ' - ' + Data[3]
            let agentName = []
            agentName = agentData && agentData.map((agentItem) => {
                return agentItem.title
            })
            if (!agentName.includes(agentList)) {
                let Data = item.split(',');
                let obj = {
                    title: Data[1] + ' - ' + Data[3],
                    value: Data[0]
                }
                agentData.push(obj)
            }
        })


        let agentResetData = [{ title: 'No Data', value: 'No Data' }]

        let latLongData = [];
        this.state.mapData.orders && this.state.mapData.orders.map(item => {
            let obj = {
                lat: Number(item.shopAddress.latitude),
                lng: Number(item.shopAddress.longitude),
                order: 1,
                title: 'Orders'
            }
            latLongData.push(obj)
        })

        this.state.mapData.users && this.state.mapData.users.map(item => {
            let obj = {
                lat: item.shopAddress && item.shopAddress.latitude ? Number(item.shopAddress.latitude) : '',
                lng: item.shopAddress && item.shopAddress.longitude ? Number(item.shopAddress.longitude) : '',
                title: 'Users'
            }
            latLongData.push(obj)
        })

        let graphData = [];
        this.state.graphData.length > 0 && this.state.graphData.map(item => {
            let Data = item.split(',')
            let obj = {
                name: Data[0], Users: Data[1], Order: Data[2]
            }
            graphData.push(obj);
        })

        let showChart = false
        graphData && graphData.map(item => {
            if (Number(item.Order) || Number(item.Users)) {
                showChart = true;
            }
        })

        return (
            <div className="customer-placeorder">
                {this.state.map && <div className="map-view">
                    <div className="col-md-10 offset-md-1">
                        <div className="order-report d-flex justify-content-between">
                            <div className="start-date">
                                <label className="label-title">Choose Date * </label>
                                <input type="date" className="date-wrap form-control" onChange={this.handleChange} value={this.state.mapStartDate} max={this.state.dateValidation} name="mapStartDate" />
                            </div>
                            {/* <div className="start-date">
                                        <label className="label-title">Choose Date * </label>
                                        <input type="date" className="date-wrap form-control" onChange={this.handleChange} value={this.state.mapStartDate} name="mapStartDate" />
                                    </div> */}

                            {!this.state.agentDropDown && <div className="tree-box">
                                <label className="label-title">Select Region * </label>
                                <TreeSelect
                                    // treeData={!this.state.agentDropDown ? { regionData } : { resetRegionData }}
                                    treeData={regionData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.mapSelectVal}
                                    onSelect={this.onSelect}
                                    // onExpand={this.onExpand}
                                    onChecked={this.onMapChecked}
                                    checkbox={mapCheckbox}
                                    // showlevel={this.state.showlevel}
                                    customTitleRender={this.customTitleRender} />
                            </div>}
                            {this.state.agentDropDown && <div className="tree-box">
                                <label className="label-title">Select Region * </label>
                                <TreeSelect
                                    // treeData={!this.state.agentDropDown ? { regionData } : { resetRegionData }}
                                    treeData={regionData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.mapSelectVal}
                                    onSelect={this.onSelect}
                                    // onExpand={false}
                                    onChecked={this.onMapChecked}
                                    checkbox={mapCheckbox}
                                    // showlevel={this.state.showlevel}
                                    customTitleRender={this.customTitleRender} />
                            </div>}
                            {this.state.agentDropDown && <div className="tree-box">
                                <label className="label-title">Sales Agent * </label>
                                {/* <input className="holder" placeholder="Search here.." /> */}
                                <TreeSelect
                                    treeData={agentData}
                                    style={{ width: 210, height: 100 }}
                                    selectVal={this.state.agentSelectVal}
                                    onSelect={this.onSelect}
                                    // onExpand={false}
                                    onChecked={this.onAgentChecked}
                                    checkbox={agentCheckBox}
                                    // showlevel={this.state.showlevel}
                                    customTitleRender={this.customTitleRender} />
                            </div>}
                            {!this.state.agentDropDown && <div className="tree-box">
                                <label className="label-title">Sales Agent * </label>
                                {/* <input className="holder" placeholder="Search here.." /> */}
                                <TreeSelect
                                    treeData={agentResetData}
                                    style={{ width: 210, height: 100 }} />
                            </div>}
                        </div>
                        <div className="search-wrap">
                            <div className="view-box">
                                <button type="button" class="data-search" onClick={this.getPlacingOrderMap}>
                                    <i class="fa fa-search" aria-hidden="true"></i>Search
                                        </button>
                            </div>
                            <div className="retail-reset">
                                <button type="button" className="reset ml-1" onClick={this.resetMapSearch}>
                                    <i className="fa fa-refresh" aria-hidden="true"></i>
                                    <span className="tooltip-text">Reset</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 col-md-10 offset-md-1">
                        <GoogleMap latLongData={latLongData} />
                    </div>
                </div>}
                {this.state.graph &&
                    <div className="graph-view">
                        <div className="col-md-7 offset-md-2">
                            <div className="d-flex justify-content-between">
                                <div className="start-date">
                                    <label className="label-title">Choose Date * </label>
                                    <input type="date" className="date-wrap form-control" onChange={this.handleChange} value={this.state.graphStartDate} max={this.state.dateValidation} name="graphStartDate" />

                                </div>
                                <div className="tree-box">
                                    <label className="label-title">Select Region * </label>
                                    {/* <input className="holder" placeholder="Search here.." /> */}
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
                                </div>
                            </div>
                            <div className="search-wrap">
                                <div className="view-box">
                                    <button type="button" class="data-search" onClick={this.getPlacingOrderGraph}>
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
                        {this.state.graphData.length > 0 && showChart ? <div className="mt-5">
                            <ReactBarLineChart barChartData={graphData} parentCallback={this.callbackFunction} barKey="Order" lineKey="Users" chartName="No of Customers Placing Orders" percentageLabel={true} />
                        </div> : <div className="record-box">No record found</div>}

                        {this.state.getBarChart && <div className="pt-5">
                            <ReactBarLineChart barChartData={this.state.subRegionBarData} parentCallback={this.callbackFunction} barKey="Order" lineKey="Users" chartName="No of Customers Placing Orders" percentageLabel={true} />
                            <div className="back-btn col-md-2"><button class="common-btn" onClick={this.hideSubBarChart}>close</button></div>
                        </div>}
                    </div>

                }
                {/* <div className="back-btn my-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div> */}
            </div>
        )
    }

}
const mapStateToProps = (state) => ({
    regionList: state.region
})
export default connect(mapStateToProps, { getReportRegion })(PlacingOrder)
