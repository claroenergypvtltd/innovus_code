import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';

export default class report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }
    orderPath = () => {
        this.props.history.push({ pathname: path.reports.placingOrder })
    }

    navigateOnboard = () => {
        this.props.history.push(path.reports.customerOnboard);
    }

    render() {
        return (
            <div>
                <h4 className="user-title">{window.strings.REPORT.REPORTMANAGEMENT}</h4>
                {/* <div className="main-wrapper setting-tab">
                    <section className="set-box">
                        <button className="set-btn set-change set-select" onClick={this.navigateOnboard}>{window.strings.REPORT.CUSTOMER_ONBOARD}</button>
                        <span className="set-line"></span>
                        <button className="set-btn set-change set-select">{window.strings.REPORT.PLACING_ORDER}</button>
                        <span className="set-line"></span>
                        <button className="set-btn set-change set-select">{window.strings.REPORT.EXECUTIVE_PERFORMANCE}</button>
                    </section>
                </div> */}
                <div className="main-wrapper">
                    <div className="set-box">
                        <button className="set-btn" onClick={this.navigateOnboard}>{window.strings.REPORT.CUSTOMER_ONBOARD}
                            <i class="fa fa-chevron-right"></i>
                        </button>
                        <button className="set-btn" onClick={this.orderPath}>{window.strings.REPORT.PLACING_ORDER}
                            <i class="fa fa-chevron-right"></i>
                        </button>
                        <button className="set-btn">{window.strings.REPORT.EXECUTIVE_PERFORMANCE}
                            <i class="fa fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}