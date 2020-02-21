import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';

export default class FetchTollFree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }

    tollFreeNumber = () => {
        this.props.history.push({ pathname: path.appSetting.addTollFree })

    }

    redirectPage = () => {
        this.props.history.push({ pathname: path.appSetting.list })

    }
    render() {
        return (
            <div>
                <div className="title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">{window.strings.APPSETTING.TOLLFREENUMBER}</h4>
                    </div>
                    <div className="right-title col-md-5">
                        <div className="d-flex justify-content-end">
                            <button className="common-btn float-right" onClick={this.tollFreeNumber}><i className="fa fa-plus sub-plus"></i>{window.strings.APPSETTING.ADD_TOLL_FREE_NUMBER}</button>
                        </div>
                    </div>
                </div>
                <div className="main-wrapper">
                    List
                </div>
                <div className="back-btn mt-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div>
            </div>
        )
    }

}