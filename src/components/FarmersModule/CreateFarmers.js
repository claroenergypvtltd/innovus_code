import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import CreatePersonalInfo from './CreatePersonalInfo';
import CreateContactInfo from './CreateContactInfo';
import FarmDetails from './FarmDetails';

export default class CreateFarmers extends Component {

    render() {
        return (
            <div className="widget-section dashboard-page">

                <Tabs>
                    <TabList>
                        <Tab> 1</Tab>
                        <Tab> 2</Tab>
                        <Tab> 3</Tab>
                        <Tab> 4</Tab>
                        <Tab> 5</Tab>
                        <Tab> 6</Tab>
                    </TabList>

                    <TabPanel>
                        <CreatePersonalInfo></CreatePersonalInfo>
                    </TabPanel>
                    <TabPanel>
                        <CreateContactInfo></CreateContactInfo>
                    </TabPanel>

                    <TabPanel>
                        <FarmDetails></FarmDetails>
                    </TabPanel>
                    <TabPanel>
                        <h5>InProgress</h5>
                    </TabPanel>
                    <TabPanel>
                        <h5>InProgress</h5>
                    </TabPanel>
                    <TabPanel>
                        <h5>InProgress</h5>
                    </TabPanel>
                </Tabs>

            </div>
        );
    }
}