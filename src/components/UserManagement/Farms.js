import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FarmList from './FarmList'

class Farms extends React.Component {
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
        console.log("this.props", this.props);
        return (
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.tabChange(tabIndex)}
            >
                <TabList className="change-tab">
                    <Tab className={this.state.tabIndex == "0" ? 'sub-select' : 'sub-change'}>{window.strings.USERMANAGEMENT.FAMS}</Tab>
                    <Tab className={this.state.tabIndex == "1" ? 'sub-select' : 'sub-change'}>{window.strings.USERMANAGEMENT.KYC}</Tab>
                </TabList>

                <TabPanel>
                    <FarmList farmerId={this.props.farmerId} />
                </TabPanel>

                <TabPanel>
                      <FarmList />
                </TabPanel>

            </Tabs>
        );
    }
}


export default Farms;