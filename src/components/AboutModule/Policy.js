import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import PropTypes from "prop-types";

export default class Policy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            submitted: false

        }

    }
    static contextTypes = {
        router: PropTypes.object
    }
    navigatePolicy = () => {
        this.context.router.history.push({ pathname: path.policy.policytab });
    }
    navigateTerms = () => {
        this.context.router.history.push({ pathname: path.policy.conditiontab });
    }
    navigateReturn = () => {
        this.context.router.history.push({ pathname: path.policy.returntab });
    }
    render() {
        return (
            <div>
                <div className="main-wrapper">
                    <div className="set-box">
                        <button className="set-btn" onClick={this.navigatePolicy}>{window.strings.ABOUT.PRIVACY_POLICY}
                            <i class="fa fa-chevron-right"></i>
                        </button>
                        <button className="set-btn" onClick={this.navigateTerms}>{window.strings.ABOUT.TERMS_AND_CONDITIONS}
                            <i class="fa fa-chevron-right"></i>
                        </button>
                        <button className="set-btn" onClick={this.navigateReturn}>{window.strings.ABOUT.RETURN_CANCELLATION_POLICY}
                            <i class="fa fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}