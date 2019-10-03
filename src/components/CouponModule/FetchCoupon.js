// FetchCoupon

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmitCategory, getSpecificCategory, getCategoryList } from '../../actions/categoryAction';
import classnames from 'classnames';
import { Form, Row, Col } from 'react-bootstrap';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import { SearchBar } from '../../shared'
import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes';
import store from '../../store/store';

export default class FetchCoupon extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            errors: {}
        }
    }

    render(){
        let stateValue = this.state;
        return(
            <div>
            <Row className="clearfix title-section">
                <Col md={7} className="title-card">
                    <h4 className="user-title"> Coupon List</h4>
                </Col>
                <Col md={5} className="right-title row">
                    <Col md={8} className="p-0">
                        <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleSearch, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                    </Col>
                    {/* <Col md={3} className="user-board add-user">
                         <button type="submit" className="filter-btn"><i className="fa fa-filter filter-icon"></i>Filter by</button>
                        </Col> */}
                    <Col md={4}>
                        <button className="common-btn" onClick={this.handlePageChange} ><i className="fa fa-plus sub-plus"></i>
                            {stateValue.tabIndex == 0 ? window.strings.USERMANAGEMENT.ADDFARMER : window.strings.USERMANAGEMENT.ADDRETAIL}
                        </button>
                    </Col>
                </Col>
            </Row>
            </div>
        )
    }
}
