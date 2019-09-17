import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FetchUser from './FetchUser';
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
    this.props.history.push(path.farmer.add);
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
        <div className="col-md-6 s-left">
          <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleSearch, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
        </div>

        <div>
          <Row>
            <Col xs={6} md={4}>
              <h3>{window.strings.USERMANAGEMENT.USER}</h3>
            </Col>

            <Col xs={6} md={4}>
              <button
                className="btn btn-warning"
                onClick={this.handlePageChange}
              >
                {stateValue.tabIndex == 0
                  ? window.strings.USERMANAGEMENT.ADDFARMER
                  : window.strings.USERMANAGEMENT.ADDRETAIL}
              </button>
            </Col>
          </Row>
          <Tabs
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => this.tabChange(tabIndex)}
          >
            <TabList>
              <Tab>{window.strings.USERMANAGEMENT.FARMER}</Tab>
              <Tab>{window.strings.USERMANAGEMENT.RETAILER}</Tab>
            </TabList>

            <TabPanel>
              <FetchUser
                roleId={this.state.selectedRoleId}
                searchText={this.state.farmerSearch}
              />
            </TabPanel>
            <TabPanel>
              <FetchUser
                roleId={this.state.selectedRoleId}
                searchText={this.state.search}
              />
            </TabPanel>
          </Tabs>
        </div>
      </Form>
    );
  }
}
const mapStateToProps = () => ({

});

export default connect(mapStateToProps, { fetchUsers })(User);

