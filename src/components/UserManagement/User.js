import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FetchUser from './FetchUser';
import { Constant } from '../../constants'
import { Form, Row, Col, } from 'react-bootstrap'
import { path } from '../../constants'

class User extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         tabIndex: Constant.CONSTANT.ZERO,
         selectedRoleId: Constant.CONSTANT.THREE,
         search: ''
      };
   }

   tabChange = (tabIndex) => {
      let roleId = tabIndex == Constant.CONSTANT.ZERO ? Constant.CONSTANT.THREE : Constant.CONSTANT.TWO;
      this.setState({ tabIndex: tabIndex, selectedRoleId: roleId });
   }
   onhandleChange = (e) => {
      e.preventDefault();
      this.setState({ search: e.target.value });
   }
   handlePageChange = (e) => {
      e.preventDefault();
      this.props.history.push(path.farmer.add);
   }

   handleSearch = (e) => {
      e.preventDefault();
      console.log("this.refs", this.refs);
      //  this.refs.fetchUser.getUserList();
   }

   render() {
      let stateValue = this.state;
      return (
         <Form>
            <div>
               <Row>
                  <Col xs={6} md={4}>
                     <h3>{window.strings.USERMANAGEMENT.USER}</h3>
                  </Col>
                  <Col xs={6} md={4}>
                     <input type="text" className="form-control" placeholder="Search" name="search" value={this.state.search} onChange={this.onhandleChange} />
                  </Col>
                  <Col xs={6} md={4}>
                     <button className="btn btn-warning" onClick={this.handlePageChange} >
                        {stateValue.tabIndex == 0 ? window.strings.USERMANAGEMENT.ADDFARMER : window.strings.USERMANAGEMENT.ADDRETAIL}
                     </button>

                  </Col>
               </Row>
               <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.tabChange(tabIndex)}
               >
                  <TabList>
                     <Tab>{window.strings.USERMANAGEMENT.FARMER}</Tab>
                     <Tab>{window.strings.USERMANAGEMENT.RETAILER}</Tab>
                  </TabList>

                  <TabPanel>
                     <FetchUser ref="fetchUser" roleId={this.state.selectedRoleId} searchText={this.state.search} />
                  </TabPanel>
                  <TabPanel>
                     <FetchUser ref="fetchUser" roleId={this.state.selectedRoleId} searchText={this.state.search} />
                  </TabPanel>
               </Tabs>
            </div>
         </Form>
      );
   }
}

export default User;
