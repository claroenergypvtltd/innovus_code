import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FetchOrderReceived from '../OrderModule/FetchOrderReceived';
import FetchPlanRoute from '../OrderModule/FetchPlanRoute';
import FetchShippingAdjustment from '../OrderModule/FetchShippingAdjustment';
import FetchOutofDelivery from '../OrderModule/FetchOutofDelivery';
import FetchDelivered from '../OrderModule/FetchDelivered';

import { Constant } from '../../constants';
import { Form, Row, Col } from 'react-bootstrap';
import { path } from '../../constants';
import { SearchBar } from '../../shared'
import { connect } from 'react-redux';

import { fetchUsers } from '../../actions/UserAction';
import FetchSalesAgent from '../SalesAgent/FetchSalesAgent';
// import TransferAgent from '../RetailersModule/TransferAgent'
// import { resorceJSON, ModalData } from '../../libraries';


class FetchOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: Constant.CONSTANT.ZERO,
            selectedRoleId: Constant.CONSTANT.THREE,
            search: '',
            searchResponse: []
        };
    }

    tabChange = tabIndex => {
        let roleId =
            tabIndex == Constant.CONSTANT.ZERO
                ? Constant.CONSTANT.THREE
                : Constant.CONSTANT.TWO;
        this.setState({ tabIndex: tabIndex, selectedRoleId: roleId });
    };

    handlePageChange = e => {
        e.preventDefault();
        // if (this.state.tabIndex == 1) {
        //   this.onOpenModal();
        // } else {
        this.props.history.push(path.retailer.add);
        // this.props.history.push(path.farmer.add);
        //}
    };
    handleSearch = e => {
        e.preventDefault();
        this.setState({ search: e.target.value })
    };
    searchResult = () => {
        if (this.state.search) {
            this.setState({ farmerSearch: this.state.search })
        }
    }
    resetSearch = () => {
        this.setState({ farmerSearch: '', search: '' })
    }
    render() {
        let stateValue = this.state;
        return (
            <Form>
                <div>

                    <Tabs className=""
                        selectedIndex={this.state.tabIndex}
                        onSelect={tabIndex => this.tabChange(tabIndex)}
                    >
                        <TabList className="order-tab d-flex">
                            <Tab className={this.state.tabIndex == "1" ? 'sub-select-orderrecvd order-wrapper grey-receive' : 'sub-change-orderrecvd order-wrapper order-receive'}>
                                <div className="col-md-4 order-dashboard">
                                    <a href="#" className="order-card">
                                        <h5>{window.strings.USERMANAGEMENT.ORDERRECEIVED}</h5>
                                        <div className="box">
                                        </div>
                                    </a>
                                </div>
                            </Tab>

                            <Tab className={this.state.tabIndex == "2" ? 'sub-select-planrecvd order-wrapper grey-plan' : 'sub-change-planrecvd order-wrapper order-plan'}>
                                <div className="col-md-4 order-dashboard">
                                    <a href="#" className="order-card">
                                        <h5>{window.strings.USERMANAGEMENT.PLANROUTE}</h5>
                                        <div className="box">
                                        </div>
                                    </a>
                                </div>
                            </Tab>
                            <Tab className={this.state.tabIndex == "3" ? 'sub-select-shippngadjmnt order-wrapper grey-ship' : 'sub-change-shippngadjmnt order-wrapper order-ship'}>
                                <div className="col-md-4 order-dashboard">
                                    <a href="#" className="order-card">
                                        <h5>{window.strings.USERMANAGEMENT.SHIPPINGADJUSTMENT}</h5>
                                        <div className="box">
                                        </div>
                                    </a>
                                </div>
                            </Tab>
                            <Tab className={this.state.tabIndex == "4" ? 'sub-select-outofdelvry order-wrapper grey-task' : 'sub-change-outofdelvry order-wrapper order-task'}>
                                <div className="col-md-4 order-dashboard">
                                    <a href="#" className="order-card">
                                        <h5>{window.strings.USERMANAGEMENT.OUTOFDELIVERY}</h5>
                                        <div className="box">
                                        </div>
                                    </a>
                                </div>
                            </Tab>
                            <Tab className={this.state.tabIndex == "5" ? 'sub-select-delivred order-wrapper grey-delivery' : 'sub-change-delivred order-wrapper order-delivery'}>
                                <div className="col-md-4 order-dashboard">
                                    <a href="#" className="order-card">
                                        <h5>{window.strings.USERMANAGEMENT.DELIVERED}</h5>
                                        <div className="box">
                                        </div>
                                    </a>
                                </div>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <FetchOrderReceived
                            // ref="fetchRetailer"
                            // roleId={this.state.selectedRoleId}
                            // searchText={this.state.farmerSearch}
                            />
                        </TabPanel>
                        <TabPanel>
                            <FetchPlanRoute
                            />
                        </TabPanel>
                        <TabPanel>
                            <FetchShippingAdjustment
                            />
                        </TabPanel>
                        <TabPanel>
                            <FetchOutofDelivery
                            />
                        </TabPanel>
                        <TabPanel>
                            <FetchDelivered
                            />
                        </TabPanel>
                    </Tabs>

                </div>
            </Form>

        );
    }
}
const mapStateToProps = () => ({

});

export default connect(mapStateToProps, {})(FetchOrder);

