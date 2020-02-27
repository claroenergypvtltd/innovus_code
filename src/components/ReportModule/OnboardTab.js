import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CustomerOnboard from './CustomerOnboard'
import { path } from '../../constants';

class OnboardTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }
    tabChange = (tabIndex) => {
        this.setState({ tabIndex: tabIndex });
    }

    redirectPage = () => {
        this.props.history.push({ pathname: path.reports.list, state: { customerOnboardBack: 'customerOnboardSessionBack' } });
    }
    render() {
        let ProfileData = this.props.profileData && this.props.profileData.id ? this.props.profileData.id : '';
        return (
            <div>
                <h4 className="user-title">{window.strings.REPORT.NUMBER_CUSTOMER_ONBOARD}</h4>
                <div className="main-wrapper">
                    <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.tabChange(tabIndex)}
                    >
                        <TabList className="change-tab">
                            <Tab className={this.state.tabIndex == "0" ? 'sub-select' : 'sub-change'}>{window.strings.REPORT.MAP_VIEW}</Tab>
                            <Tab className={this.state.tabIndex == "1" ? 'sub-select' : 'sub-change'}>{window.strings.REPORT.GRAPH_VIEW}</Tab>
                        </TabList>

                        <TabPanel>
                            <CustomerOnboard view="map" />
                        </TabPanel>
                        <TabPanel>
                            <CustomerOnboard view="graph" />
                        </TabPanel>

                    </Tabs>
                </div>
                <div className="back-btn my-3">
                    <button className="common-btn" onClick={this.redirectPage}>Back</button>
                </div>
            </div>
        )
    }
}
export default OnboardTab;
