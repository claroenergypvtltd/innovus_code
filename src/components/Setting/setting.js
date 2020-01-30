import React, { Component } from 'react';
import { connect } from 'react-redux'
import classnames from 'classnames';
import { toastr } from '../../services';
import { path } from '../../constants';

export default class setting extends Component {
    constructor() {
        super()
        this.state = {
            errors: {},
            submitted: false,

        }
    }

    render() {
        return (
            <div>
                <h4 className="user-title">{window.strings.APPSETTING.SETTING}</h4>
                <div className="main-wrapper wrap-box">
                    <ul className="set-title">
                        <li><a href="#">{window.strings.APPSETTING.APPVERSIONCONTROL}</a></li>
                        <li><a href="#">{window.strings.APPSETTING.QUANTITYTYPECONTROL}</a></li>

                    </ul>
                </div>
            </div>
        );
    }
}
