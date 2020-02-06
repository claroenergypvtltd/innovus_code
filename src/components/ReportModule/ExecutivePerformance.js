import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import TreeSelect from 'react-do-tree-select';

export default class CustomerOnboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.reports.list, state: { executivePerfomanceBack: 'executivePerfomanceSessionBack' } });
    }
    render() {
        const treeData = [
            {
                title: 'First',
                value: '1',
                children: [
                    {
                        title: 'second',
                        value: '1-1',
                    },
                    {
                        title: 'child 1',
                        value: '1-1-1',
                    }, {
                        title: 'child 2',
                        value: '1-1-2',
                    }
                ]
            },
            {
                title: 'First',
                value: '12'
            },

            {
                title: 'First',
                value: '13'
            }
            ,
            {
                title: 'First',
                value: '14'
            }
            ,
            {
                title: 'First',
                value: '144'
            }
            ,
            {
                title: 'First',
                value: '143'
            }
            ,
            {
                title: 'First',
                value: '127'
            }
            ,
            {
                title: 'First',
                value: '19'
            }
        ]
        const checkbox = {
            enable: true,
            parentChain: true, // child Affects parent nodes;
            childrenChain: true, // parent Affects child nodes;
            halfChain: true, // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: [] // Initialize check multiple lists
        }
        return (
            <div className="customer-onboard">
                <h4 className="user-title">{window.strings.REPORT.SALES_EXECUTIVE_PERFORMANCE}</h4>
                <div className="mt-3">
                    <div className="map-view main-wrapper">
                        <div className="d-flex justify-content-around">
                            <div className="start-date mr-2">
                                <label className="label-title">Start Date:</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="end-date mr-2">
                                <label className="label-title">End Date:</label>
                                <input type="date" className="form-control" />
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
                <div className="back-btn mt-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div>
            </div>)
    }

}