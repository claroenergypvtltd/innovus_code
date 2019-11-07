import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

class FetchOutofDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div >
                <div className="main-wrapper mt-3">
                    <div className="row p-3 m-0">
                        <div className="col-md-4 d-flex">
                            <span className="vehicle-icon">
                                <label className="order-label">Vehicle Category :</label>
                            </span>
                            <p className="order-text"></p>
                        </div>
                        <div className="col-md-4 d-flex">
                            <span className="number-icon">
                                <label className="order-label">Vehicle Number :</label>
                            </span>
                            <p className="order-text"></p>
                        </div>
                        <div className="col-md-4 d-flex">
                            <span className="drive-icon">
                                <label className="order-label">Driver Name :</label>
                            </span>
                            <p className="order-text"></p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps, {})(FetchOutofDelivery);
