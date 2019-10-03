import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmitCategory, getSpecificCategory, getCategoryList } from '../../actions/categoryAction';
import classnames from 'classnames';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes';
import store from '../../store/store';

export default class CreateCoupon extends Component {
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
        const { errors } = this.state;

        const categoryDropDown = this.state.categoryData && this.state.categoryData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });
        return(
            <div>
                
                <div className="row clearfix">
                    <div className="col-md-12">
                        <h4 className="user-title">Add New Coupon</h4>
                        <div className="box-wrapper main-wrapper">
                            <h4 className="color-title line-wrapper">Coupon Details</h4>
                            <div className="">
                                <div className="create-coupon col-md-8">
                                    <form onSubmit={this.handleSubmit} noValidate className="row m-0 pt-3">

                                    <div className="form-group col-md-12">

                                            <label>Coupon Title</label>

                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleInputChange}
                                                value={this.state.name}
                                                required

                                            />

                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['CATEGORY']['CATE_NAME'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                        {!this.state.cropId && <div className="form-group col-md-6 pt-2">

                                            <label>Coupon Type</label>

                                            <select required name="parentId" className="form-control" value={this.state.parentId} onChange={this.handleInputChange}>
                                                <option value="0">Select Category</option>
                                                {categoryDropDown}
                                            </select>

                                            {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>}
                                        
                                        {!this.state.cropId && <div className="form-group col-md-6 pt-2">

                                            <label>Coupon Amount</label>

                                            <select required name="parentId" className="form-control" value={this.state.parentId} onChange={this.handleInputChange}>
                                                <option value="0">Select Category</option>
                                                {categoryDropDown}
                                            </select>

                                            {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>}

                                        <div className="form-group col-md-6 pt-2">

                                            <label>Start Date</label>

                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className={classnames('form-control calendar-icon', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleInputChange}
                                                value={this.state.name}
                                                required
                                            />
                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['CATEGORY']['CATE_NAME'] + window.strings['ISREQUIRED']}</div>}
                                    </div>
                                    <div className="form-group col-md-6 pt-2">

                                            <label>Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className={classnames('form-control calendar-icon', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleInputChange}
                                                value={this.state.name}
                                                required

                                            />

                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['CATEGORY']['CATE_NAME'] + window.strings['ISREQUIRED']}</div>}
                                    </div>
                                    <div className="form-group col-md-12 pt-2">
                                        <label>{window.strings.CATEGORY.DESCRIPTION}</label>
                                            <textarea
                                                placeholder="description"
                                                className={classnames('form-control', {
                                                'is-invalid': errors.description
                                                })}
                                                name="description"
                                                onChange={this.handleInputChange}
                                                value={this.state.description}
                                                required
                                            ></textarea>
                                        {this.state.submitted && !this.state.description && <div className="mandatory">{window.strings['CATEGORY']['DESCRIPTION'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                        <div className="form-group col-md-12 pt-3">
                                             <div className="img-box ">
                                            {/* <label>{window.strings.CATEGORY.IMAGE}</label> */}
                                                <input type="file" className="img-input" multiple />
                                                <p>Upload Coupon Image</p>
                                            {/* <input
                                                type="file"
                                                placeholder="image"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.image
                                                })}
                                                name="image"
                                                onChange={this.onhandleImageChange}
                                                required

                                            /> */}
                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['CATEGORY']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                        {/* <img className="pre-view"></img> */}
                                            </div>
                                        </div>


                                        <div className="col-md-12 bottom-section">
                                                <button type="button" className="btn btn-default" onClick={this.listPage}>{window.strings.CANCEL}</button>
                                                <button type="submit" className="btn btn-primary">{window.strings.SUBMIT}</button>       
                                        </div>


                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
