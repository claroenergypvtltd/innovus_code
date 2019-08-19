import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import CreatePersonalInfo from './CreatePersonalInfo';
import CreateContactInfo from './CreateContactInfo';
import CreateFarmDetails from './CreateFarmDetails';
import CreateCropDetails from './CreateCropDetails';
import CreateIrrigationSchedule from './CreateIrrigationSchedule';
import KYCDetails from './KYCDetails';


export default class CreateFarmers extends Component {

    constructor() {
        super();
        this.state = { tabIndex: 0 };
    }

    check = (tabKey) => {
        debugger;
        this.setState({ tabIndex: tabKey })
    }
    tabSelect = (tabIndex, eventKey, activeKey) => {
        this.setState({ tabIndex: tabIndex });
    }



    render() {
        return (
            <div className="widget-section dashboard-page">

                <Tabs selectedIndex={this.state.tabIndex} onSelect={(tabIndex, eventKey, activeKey) => this.tabSelect(tabIndex, eventKey, activeKey)} >
                    <TabList>
                        <Tab eventKey={1} disabled={this.state.tabIndex < 0}> 1</Tab>
                        <Tab eventKey={2} disabled={this.state.tabIndex < 1}> 2</Tab>
                        <Tab eventKey={3} disabled={this.state.tabIndex < 2}> 3</Tab>
                        <Tab eventKey={4} disabled={this.state.tabIndex < 3}> 4</Tab>
                        <Tab eventKey={5} disabled={this.state.tabIndex < 4}> 5</Tab>
                        <Tab eventKey={6} disabled={this.state.tabIndex < 5}> 6</Tab>
                    </TabList>


                    <TabPanel>
                        <CreatePersonalInfo childData={this.check} ></CreatePersonalInfo>
                    </TabPanel>
                    <TabPanel>
                        <CreateContactInfo childData={this.check}></CreateContactInfo>
                    </TabPanel>

                    <TabPanel>
                        <CreateFarmDetails childData={this.check}></CreateFarmDetails>
                    </TabPanel>
                    <TabPanel>
                        <CreateCropDetails childData={this.check}></CreateCropDetails>
                    </TabPanel>
                    <TabPanel>
                        <CreateIrrigationSchedule childData={this.check}></CreateIrrigationSchedule>
                    </TabPanel>
                    <TabPanel>
                        <KYCDetails childData={this.check}></KYCDetails>
                    </TabPanel>

                </Tabs>

            </div>
        );
    }
}