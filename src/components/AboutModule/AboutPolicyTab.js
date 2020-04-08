import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import About from './About'
import Policy from './Policy'


export default class AboutPolicyTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }
    tabChange = (tabIndex) => {
        this.setState({ tabIndex: tabIndex });
    }
    render() {
        let ProfileData = this.props.profileData && this.props.profileData.id ? this.props.profileData.id : '';
        return (
            <div className="main-wrapper">
                {/* <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.tabChange(tabIndex)}
                >
                    <TabList className="change-tab">
                        <Tab className={this.state.tabIndex == "0" ? 'sub-select' : 'sub-change'}>{window.strings.ABOUT.ABOUTUS}</Tab>
                        <Tab className={this.state.tabIndex == "1" ? 'sub-select' : 'sub-change'}>{window.strings.ABOUT.POLICIES}</Tab>
                    </TabList>

                    <TabPanel>
                        <About profileData={this.props.profileData} />
                    </TabPanel>

                    <TabPanel>
                        <Policy profileID={ProfileData} />
                    </TabPanel>

                </Tabs> */}
            </div>
        )
    }
}
