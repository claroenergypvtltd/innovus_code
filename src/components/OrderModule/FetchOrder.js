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
                    <div className="main-wrapper">
                        <Tabs className="main-tab sub-tab"
                            selectedIndex={this.state.tabIndex}
                            onSelect={tabIndex => this.tabChange(tabIndex)}
                        >
                            <TabList className="change-tab d-flex">
                                <Tab className={this.state.tabIndex == "1" ? 'sub-select-orderrecvd' : 'sub-change-orderrecvd'}>{window.strings.USERMANAGEMENT.ORDERRECEIVED}</Tab>
                                <Tab className={this.state.tabIndex == "2" ? 'sub-select-planrecvd' : 'sub-change-planrecvd'}>{window.strings.USERMANAGEMENT.PLANROUTE}</Tab>
                                <Tab className={this.state.tabIndex == "3" ? 'sub-select-shippngadjmnt' : 'sub-change-shippngadjmnt'}>{window.strings.USERMANAGEMENT.SHIPPINGADJUSTMENT}</Tab>
                                <Tab className={this.state.tabIndex == "4" ? 'sub-select-outofdelvry' : 'sub-change-outofdelvry'}>{window.strings.USERMANAGEMENT.OUTOFDELIVERY}</Tab>
                                <Tab className={this.state.tabIndex == "5" ? 'sub-select-delivred' : 'sub-change-delivred'}>{window.strings.USERMANAGEMENT.DELIVERED}</Tab>
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
                </div>
            </Form>

        );
    }
}
const mapStateToProps = () => ({

});

export default connect(mapStateToProps, {})(FetchOrder);

