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



    render() {
        return (
            <div className="widget-section dashboard-page">

                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex: tabIndex })} >
                    <TabList>
                        <Tab> 1</Tab>
                        <Tab> 2</Tab>
                        <Tab> 3</Tab>
                        <Tab> 4</Tab>
                        <Tab> 5</Tab>
                        <Tab> 6</Tab>
                    </TabList>

                    <TabPanel>
                        <CreatePersonalInfo childData={this.check}></CreatePersonalInfo>
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