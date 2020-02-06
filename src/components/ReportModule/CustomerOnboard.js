import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';

export default class CustomerOnboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.reports.list, state: { customerOnboardBack: 'customerOnboardSessionBack' } });
    }
    render() {
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