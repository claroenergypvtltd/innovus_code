import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ShopDetails from './ShopDetails'
import RetKYCList from './RetKYCList'


class Shops extends React.Component {
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

        return (
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.tabChange(tabIndex)}
            >
                <TabList className="change-tab">
                    <Tab className={this.state.tabIndex == "0" ? 'sub-select' : 'sub-change'}>{window.strings.USERMANAGEMENT.SHOP}</Tab>
                    <Tab className={this.state.tabIndex == "1" ? 'sub-select' : 'sub-change'}>{window.strings.USERMANAGEMENT.KYC}</Tab>
                </TabList>

                <TabPanel>
                    <ShopDetails profileData={this.props.profileData} />
                </TabPanel>

                <TabPanel>
                    <RetKYCList profileID={this.props.profileData.id} />
                </TabPanel>

            </Tabs>

        )
    }
}
export default Shops;
