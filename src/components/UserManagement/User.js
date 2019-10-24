import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FetchUser from './FetchUser';
import FetchRetailer from '../RetailersModule/FetchRetailer';
import { Constant } from '../../constants';
import { Form, Row, Col } from 'react-bootstrap';
import { path } from '../../constants';
import { SearchBar } from '../../shared'
import { connect } from 'react-redux';

import { fetchUsers } from '../../actions/UserAction';


class User extends Component {
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
    // let redrctpath = this.state.tabIndex == 1 ? path.retailer.add : path.farmer.add;
    let redrctpath = path.retailer.add;
    this.props.history.push(redrctpath);
    // this.props.history.push(path.farmer.add);
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
        {/* <div className="col-md-6 s-left">
          <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleSearch, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
        </div> */}
        <div>
          <Row className="clearfix title-section">
            <Col md={7} className="title-card">
              <h4 className="user-title">{window.strings.USERMANAGEMENT.USER}</h4>
            </Col>
            <Col md={5} className="right-title row pb-3">
              <Col md={8} className="p-0">
                <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleSearch, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                {/* <i className="fa fa-search search-icon"></i><input type="text" className="search-btn" placeholder="Search.." />  */}
              </Col>
              {/* <Col md={3} className="user-board add-user">
                <button type="submit" className="filter-btn"><i className="fa fa-filter filter-icon"></i>Filter by</button>
              </Col> */}
              <Col md={3} className="p-0">
                <button className="common-btn" onClick={this.handlePageChange} ><i className="fa fa-plus sub-plus"></i>
                  {/* {stateValue.tabIndex == 0 ? window.strings.USERMANAGEMENT.ADDFARMER : window.strings.USERMANAGEMENT.ADDRETAIL} */}
                  {window.strings.USERMANAGEMENT.ADDRETAIL}

                </button>
              </Col>
            </Col>

          </Row>
          <div className="main-wrapper">
            <Tabs className="main-tab"
              selectedIndex={this.state.tabIndex}
              onSelect={tabIndex => this.tabChange(tabIndex)}
            >
              <TabList className="change-tab">
                {/* <Tab className={this.state.tabIndex == "0" ? 'sub-select' : 'sub-change'} >{window.strings.USERMANAGEMENT.FARMER}</Tab> */}
                <Tab className={this.state.tabIndex == "1" ? 'sub-select' : 'sub-change'}>{window.strings.USERMANAGEMENT.RETAILER}</Tab>
                {/* <Tab className={this.state.tabIndex == "1" ? 'sub-select' : 'retail-change'}>{window.strings.USERMANAGEMENT.RETAILER}</Tab> */}

              </TabList>

              {/* <TabPanel className="main-panel">
                <FetchUser
                  // ref="fetchUser"
                  roleId={this.state.selectedRoleId}
                  searchText={this.state.farmerSearch}
                />
              </TabPanel> */}
              <TabPanel>
                <FetchRetailer
                  // ref="fetchRetailer"
                  roleId={this.state.selectedRoleId}
                  searchText={this.state.farmerSearch}
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

export default connect(mapStateToProps, { fetchUsers })(User);

