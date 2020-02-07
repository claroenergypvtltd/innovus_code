import React, { Component } from 'react'
import { connect } from 'react-redux';
import TreeSelect from 'react-do-tree-select';
import { getRegion } from '../../actions/regionAction'
import { getCustomerMapView } from '../../actions/reportAction'
import { fetchReportGraph } from '../../actions/reportAction'
import { path } from '../../constants';
import { ReactBarLineChart } from '../../shared/Reactgraphcharts'
import GoogleMap from '../../shared/GoogleMap'

class CustomerOnboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showlevel: 0,
            startDate: '',
            expiryDate: '',
            selectVal: [],
            selectVal1: [],
            mapData: [],
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

        let dData1 = [
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

        // this.setState({ regionListData: dData, regionListData1: dData1 })

    }


    componentWillReceiveProps(newProps) {
        if (newProps && newProps.regionList && newProps.regionList.Lists && newProps.regionList.Lists.datas) {
            this.setState({ regionListData: newProps.regionList.Lists.datas, totalCount: newProps.regionList.Lists.totalCount })
        }
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

    onChecked1 = (data, value) => {
        let regionArray = [];
        data.map(item => {
            if (!item.includes('parent')) {
                regionArray.push(item);

            }
        })
        this.state.selectVal1 = regionArray
    }

    getRegion = () => {
        let obj = {
            page: '',
            rows: ''
        }
        this.props.getRegion(obj)
    }

    redirectPage = () => {
        this.props.history.push({ pathname: path.reports.list, state: { customerOnboardBack: 'customerOnboardSessionBack' } });
    }

    dateChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    getMapView = () => {
        this.setState({ mapSubmit: true })
        if (this.state.startDate && this.state.expiryDate && (this.state.startDate <= this.state.expiryDate) && this.state.selectVal.length > 0) {
            let obj = {
                startDate: this.state.startDate,
                expiryDate: this.state.expiryDate,
                regionData: this.state.selectVal
            }

            getCustomerMapView(obj).then(resp => {
                if (resp) {
                    this.setState({ mapData: resp.data })
                }
            })
        }

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

        let treeData1 = []
        this.state.regionListData1 && this.state.regionListData1.map((item, index) => {
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
            treeData1.push(obj)
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

        let latLongData = [];

        this.state.mapData && this.state.mapData.map(item => {
            let obj = {
                lat: item.shopAddress.latitude,
                lng: item.shopAddress.longitude
            }
            latLongData.push(obj)
        })

        return (
            <div className="customer-onboard">
                <h4 className="user-title">{window.strings.REPORT.NUMBER_CUSTOMER_ONBOARD}</h4>
                <div className="mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="map-view main-wrapper">
                                <h4 className="user-title">{window.strings.REPORT.MAP_VIEW}</h4>
                                <div className="d-flex justify-content-around">
                                    <div className="d-block">
                                        <div className="start-date mr-2">
                                            <label className="label-title">Start Date * :</label>
                                            <input type="date" value={this.state.startDate} name="startDate" onChange={this.dateChange} className="form-control date-wrap" />
                                            {this.state.mapSubmit && !this.state.startDate && <div className="mandatory">{"Start Date" + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="end-date mr-2">
                                            <label className="label-title">End Date * :</label>
                                            <input type="date" value={this.state.expiryDate} name="expiryDate" onChange={this.dateChange} className="form-control date-wrap" />
                                            {this.state.mapSubmit && !this.state.expiryDate && <div className="mandatory">{"End Date:" + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                    </div>
                                    <div className="tree-box">
                                        <label className="label-title">Select Region * :</label>
                                        <input className="holder" placeholder="Search here.." />
                                        <TreeSelect
                                            treeData={treeData}
                                            style={{ width: 210, height: 100 }}
                                            selectVal={this.state.selectVal}
                                            onSelect={this.onSelect}
                                            checkbox={checkbox}
                                            onChecked={this.onChecked}
                                            customTitleRender={this.customTitleRender} />
                                        {this.state.mapSubmit && this.state.selectVal.length < 1 && <div className="mandatory">{"Region " + window.strings['ISREQUIRED']}</div>}
                                    </div>
                                </div>
                                <div className=" view-box">
                                    <button onClick={this.getMapView} className="data-search" >
                                        <i class="fa fa-search" aria-hidden="true"></i>Search
                                    </button>
                                </div>
                                <div className="pt-5">
                                    <GoogleMap latLongData={latLongData} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="graph-view main-wrapper">
                                <h4 className="user-title">{window.strings.REPORT.GRAPH_VIEW}</h4>
                                <div className="d-flex justify-content-around">
                                    <div className="d-block">
                                        <div className="start-date">
                                            <label className="label-title">Start Date * :</label>
                                            <input type="date" value={this.state.startDate1} className="form-control date-wrap" />
                                            {this.state.graphSubmit && !this.state.startDate1 && <div className="mandatory">{"Start Date " + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="end-date">
                                            <label className="label-title">End Date * :</label>
                                            <input type="date" value={this.state.expiryDate1} className="form-control date-wrap" />
                                            {this.state.graphSubmit && !this.state.expiryDate1 && <div className="mandatory">{"End Date " + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                    </div>
                                    <div className="tree-box">
                                        <label className="label-title">Select Region * :</label>
                                        <input className="holder" placeholder="Search here.." />
                                        <TreeSelect
                                            treeData={treeData1}
                                            style={{ width: 210, height: 100 }}
                                            selectVal={this.state.selectVal1}
                                            onChecked={this.onChecked1}
                                            checkbox={checkbox1}
                                            customTitleRender={this.customTitleRender} />
                                        {this.state.graphSubmit && this.state.selectVal1.length < 1 && <div className="mandatory">{"Region " + window.strings['ISREQUIRED']}</div>}
                                    </div>
                                </div>
                                <div className=" view-box">
                                    <button type="button" class="data-search" onClick={this.getGraphView}>
                                        <i class="fa fa-search" aria-hidden="true"></i>Search
                                        </button>
                                </div>


                                <div className="pt-5">
                                    <ReactBarLineChart />
                                </div>
                            </div>
                        </div>
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
    regionList: state.region
})
export default connect(mapStateToProps, { getRegion })(CustomerOnboard)
