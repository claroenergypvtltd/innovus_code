import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

class FetchPlanRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            // <p>FetchPlanRoute</p>
            <div>
                <div className="main-wrapper d-flex mt-3 p-3">
                    <p className="order-text">  No vehicle assigned yet! Click the button to assign vehicle</p>
                    <div className="flex-grow-1 text-right">
                        <button className="common-btn">Assign Vehicle</button>
                    </div>
                </div>
                <div className="plan-table">
                </div>
                <div className="mt-3 text-center">
                    <button className="common-btn"><i class="fa fa-plus sub-plus"></i>Add Vehicle</button>
                </div>
                <div className="text-right mt-3">
                    <button className="common-btn">Next<i class="fa fa-arrow-right"></i></button>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps, {})(FetchPlanRoute);
