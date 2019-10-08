import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmitCategory, getSpecificCategory, getCategoryList } from '../../actions/categoryAction';
import classnames from 'classnames';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes';
import store from '../../store/store';
import { TableData } from '../../shared/Table'


export default class IrrigationSetting extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Serial Number", "State", "City", "Price", "Square Feet", "Action"],
            submitted: false,
            errors: {}
        }
    }
   
    render(){
        const { errors } = this.state;

        const categoryDropDown = this.state.categoryData && this.state.categoryData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        const subCategoryDropDown = this.state.subCategoryDatas && this.state.subCategoryDatas.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        const weightDropDown = this.state.weightDatas && this.state.weightDatas.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        return(
            <div className="irrigation-setting">
                <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">Irrigation Settings Page</h4>
                    </div>
                    <div className="right-title row col-md-5">
                        {/* <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} /> */}
                        <div className="col-md-4">
                            <button className="common-btn" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>{window.strings.PRICE.ADD_PRICE}</button>
                        </div>
                    </div>
                </div>
                <div className="main-wrapper p-3">
                <div className="col-md-8 add-price">
                                    <form onSubmit={this.handleSubmit} noValidate className="row m-0">

                                        <div className="form-group col-md-6">
                                            <label>State</label>
                                            <select required name="parentId" className="form-control" value={this.state.parentId} onChange={this.handleCategoryChange}>
                                                <option value="0">Select Category</option>
                                                {categoryDropDown}
                                            </select>
                                            {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>City</label>
                                            <select required name="categoryId" className="form-control" value={this.state.categoryId} onChange={this.handleSubCategory}>
                                                <option value="0">Select SubCategory </option>
                                                {subCategoryDropDown}
                                            </select>
                                            {this.state.submitted && !this.state.categoryId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                    
                                        <div className="form-group col-md-6">
                                            <label>Price</label>
                                            <input
                                                type="number"
                                                placeholder="Weight"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.weight
                                                })}
                                                name="weight"
                                                onChange={this.handleInputChange}
                                                value={this.state.weight}
                                                required
                                            />
                                            {this.state.submitted && !this.state.weight && <div className="mandatory">{window.strings['CROP']['WEIGHT'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                   
                                        <div className="form-group col-md-6">
                                            <label>Square Feet</label>
                                            <input type="number"
                                                placeholder="price"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.price
                                                })}
                                                name="price"
                                                onChange={this.handleInputChange}
                                                value={this.state.price}
                                                required

                                            />
                                            {this.state.submitted && !this.state.price && <div className="mandatory">{window.strings['CROP']['PRICE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                            
                                        <div className="col-md-12 bottom-section">
                                            <button type="button" className="btn btn-default" onClick={this.listPath}>{window.strings.CANCEL}</button>
                                            <button type="submit" className="btn btn-primary" disabled={this.state.loading}>{window.strings.SUBMIT}</button>
                                        </div>
                                    </form>
                                </div>
        
                </div>
            </div>
            
        )
    }
}
