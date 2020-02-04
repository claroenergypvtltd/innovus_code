import React, { Component } from 'react'
import { connect } from 'react-redux';

export default class PlacingOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }

    render() {
        return (
            <div className="customer-placeorder">
                <h4 className="user-title">{window.strings.REPORT.NUMBER_CUSTOMER_PLACEORDER}</h4>
                <div className="mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="map-view main-wrapper">
                                <h4 className="user-title">{window.strings.REPORT.MAP_VIEW}</h4>
                                <div className="d-flex">
                                    <div className="start-date mr-2">
                                        <label className="label-title">Start Date:</label>
                                        <input type="date" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="graph-view main-wrapper">
                                <h4 className="user-title">{window.strings.REPORT.GRAPH_VIEW}</h4>
                                <div className="d-flex">
                                    <div className="start-date mr-2">
                                        <label className="label-title">Start Date:</label>
                                        <input type="date" className="form-control" />
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