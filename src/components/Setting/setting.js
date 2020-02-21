import React, { Component } from 'react';
import { connect } from 'react-redux'
import classnames from 'classnames';
import { toastr } from '../../services';
import { path } from '../../constants';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Constant } from '../../constants';
import PropTypes from "prop-types";


export default class setting extends Component {
    constructor() {
        super()
        this.state = {
            errors: {},
            submitted: false,
            tabIndex: Constant.CONSTANT.ZERO,
            selectedRoleId: Constant.CONSTANT.THREE,
        }
    }
    static contextTypes = {
        router: PropTypes.object
    }
    // appVersion
    redirectControlPage = () => {

        this.props.history.push({ pathname: path.appSetting.appVersion })
    }

    quantityPath = () => {
        this.props.history.push('/setting/fetchquantitytype')
    }
    policyList = () => {
        this.props.history.push({ pathname: path.policy.policyList })
    }
    aboutList = () => {
        this.props.history.push({ pathname: path.aboutUs.about })
    }
    navigatePolicy = (heading, title) => {
        this.context.router.history.push({ pathname: path.policy.form, state: { heading: heading, title: title } });
    }
    tabChange = tabIndex => {
        sessionStorage.removeItem('retsearchDatas');
        let roleId =
            tabIndex == Constant.CONSTANT.ZERO
                ? Constant.CONSTANT.THREE
                : Constant.CONSTANT.TWO;
        this.setState({ tabIndex: tabIndex, selectedRoleId: roleId });
    };
    render() {
        return (
            <div>
                <h4 className="user-title">{window.strings.APPSETTING.SETTING}</h4>
                <div className="main-wrapper">
                    <div className="set-box">
                        <div className="row">
                            <button className="set-tab" onClick={this.redirectControlPage}>{window.strings.APPSETTING.APP_VERSION_CONTROL}
                                <i class="fa fa-chevron-right"></i>
                            </button>
                            <button className="set-tab" onClick={this.quantityPath}>{window.strings.APPSETTING.QUANTITY_TYPE_CONTROL}
                                <i class="fa fa-chevron-right"></i>
                            </button>
                            <button className="set-tab" onClick={this.aboutList}>{window.strings.ABOUT.ABOUTUS}
                                <i class="fa fa-chevron-right"></i>
                            </button>
                            <button className="set-tab" onClick={() => this.navigatePolicy("privacy", window.strings.ABOUT.PRIVACYPOLICY)}>{window.strings.ABOUT.PRIVACY_POLICY}
                                <i class="fa fa-chevron-right"></i>
                            </button>
                            <button className="set-tab" onClick={() => this.navigatePolicy("terms", window.strings.ABOUT.TERMSCONDITIONS)}>{window.strings.ABOUT.TERMS_AND_CONDITIONS}
                                <i class="fa fa-chevron-right"></i>
                            </button>
                            <button className="set-tab" onClick={() => this.navigatePolicy("cancellation", window.strings.ABOUT.RETURNCANCELLATIONPOLICY)}>{window.strings.ABOUT.RETURN_CANCELLATION_POLICY}
                                <i class="fa fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            // <Tabs
            //     selectedIndex={this.state.tabIndex}
            //     onSelect={tabIndex => this.tabChange(tabIndex)}
            // >
            //     <TabList className="setting-tab main-wrapper">
            //         <Tab className={this.state.tabIndex == "0" ? 'draw setting-select' : 'setting-change'}>{window.strings.APPSETTING.APPVERSIONCONTROL}</Tab>
            //         <Tab className={this.state.tabIndex == "1" ? 'setting-select' : 'setting-change'}>{window.strings.APPSETTING.QUANTITYTYPECONTROL}</Tab>

            //     </TabList>
            //     <TabPanel>

            //     </TabPanel>
            //     <TabPanel>

            //     </TabPanel>
            // </Tabs>
        );
    }
}


