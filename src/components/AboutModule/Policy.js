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
    navigatePolicy = (heading, title) => {
        this.context.router.history.push({ pathname: path.policy.form, state: { heading: heading, title: title } });
    }
    render() {
        return (
            <div>
                <div className="main-wrapper">
                    <div className="set-box">
                        <button className="set-btn" onClick={() => this.navigatePolicy("privacy", window.strings.ABOUT.PRIVACYPOLICY)}>{window.strings.ABOUT.PRIVACY_POLICY}
                            <i class="fa fa-chevron-right"></i>
                        </button>
                        <button className="set-btn" onClick={() => this.navigatePolicy("terms", window.strings.ABOUT.TERMSCONDITIONS)}>{window.strings.ABOUT.TERMS_AND_CONDITIONS}
                            <i class="fa fa-chevron-right"></i>
                        </button>
                        <button className="set-btn" onClick={() => this.navigatePolicy("cancellation", window.strings.ABOUT.RETURNCANCELLATIONPOLICY)}>{window.strings.ABOUT.RETURN_CANCELLATION_POLICY}
                            <i class="fa fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}