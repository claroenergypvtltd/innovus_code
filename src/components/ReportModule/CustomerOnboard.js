import React, { Component } from 'react'
import { connect } from 'react-redux';
// import DropdownTreeSelect from 'react-dropdown-tree-select'
// import 'react-dropdown-tree-select/dist/styles.css'
// import DropdownTreeSelectHOC from "./HOC";
// import TreeSelect, { TreeNode, SHOW_PARENT } from 'rc-tree-select';
import TreeSelect from 'react-do-tree-select';
import { getRegion } from '../../actions/regionAction'
import { fetchReportGraph } from '../../actions/reportAction'
import { path } from '../../constants';

class CustomerOnboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showlevel: 0,
            errors: {}
        }
    }

    componentDidMount() {
        this.getRegion();
    }


    componentWillReceiveProps(newProps) {
        if (newProps && newProps.regionList && newProps.regionList.Lists && newProps.regionList.Lists.datas) {
            this.setState({ regionListData: newProps.regionList.Lists.datas, totalCount: newProps.regionList.Lists.totalCount })
        }
    }

    onDropdownChange = (currentNode, selectedNodes) => {
        console.log('onChange::', currentNode, selectedNodes)
    }

    onChecked(val, e) {
        console.log(val);
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
                value: item.name,
                children: childArray,
            }
            treeData.push(obj)
        })

        const checkbox = {
            enable: true,
            parentChain: true,              // child Affects parent nodes;
            childrenChain: true,            // parent Affects child nodes;
            halfChain: true,                // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: []             // Initialize check multiple lists
        }

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
                                            <label className="label-title">Start Date:</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <div className="end-date mr-2">
                                            <label className="label-title">End Date:</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="tree-box mt-3">
                                        <TreeSelect
                                            treeData={treeData}
                                            style={{ width: 210, height: 100 }}
                                            selectVal={this.state.selectVal}
                                            onSelect={this.onSelect}
                                            onExpand={false}
                                            onChecked={this.onChecked}
                                            checkbox={checkbox}
                                            showlevel={this.state.showlevel}
                                            customTitleRender={this.customTitleRender} />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="graph-view main-wrapper">
                                <h4 className="user-title">{window.strings.REPORT.GRAPH_VIEW}</h4>
                                <div className="d-flex justify-content-around">
                                    <div className="d-block">
                                        <div className="start-date mr-2">
                                            <label className="label-title">Start Date:</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <div className="end-date mr-2">
                                            <label className="label-title">End Date:</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="tree-box mt-3">
                                        <TreeSelect
                                            treeData={treeData}
                                            style={{ width: 210, height: 100 }}
                                            selectVal={this.state.selectVal}
                                            onSelect={this.onSelect}
                                            onExpand={false}
                                            onChecked={this.onChecked}
                                            checkbox={checkbox}
                                            showlevel={this.state.showlevel}
                                            customTitleRender={this.customTitleRender} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="back-btn mt-3">
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
