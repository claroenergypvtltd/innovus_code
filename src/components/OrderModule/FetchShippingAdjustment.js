import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

class FetchShippingAdjustment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }
    render() {
        const { errors } = this.state;

        return (

            <div>
                <div className="main-wrapper mt-3">
                    {/* <p>FetchShippingAdjustment</p> */}
                    <div className="row clearfix p-3">
                        <div className="col-md-12">
                            {/* <h4 className="user-title">{!this.state.vehicleId ? window.strings.SETTING.ADD_VEHICLE : window.strings.SETTING.EDIT_VEHICLE}</h4> */}
                            <h4 className="user-title">Shipping Adjustment</h4>
                            <div className="pt-3">
                                <div className="col-md-8 ">
                                    <form onSubmit={this.handleSubmit} noValidate className="row m-0">

                                        <div className="form-group col-md-6">
                                            <label>{window.strings['ORDERS']['PRODUCT_ID']}</label>
                                            <select required name="parentId" className="form-control" value={this.state.parentId} onChange={this.handleCategoryChange}>
                                                <option value="0">Select Product ID</option>
                                                {/* {categoryDropDown} */}
                                            </select>
                                            {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['CATEGORY']['CATEGORY_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label>{window.strings['ORDERS']['PRODUCT_NAME']}</label>
                                            <input
                                                type="number"
                                                placeholder=""
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
                                            <label>{window.strings['ORDERS']['QUALITY_AVAILABLE']}</label>
                                            <input
                                                type="number"
                                                placeholder=""
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
                                            <label>{window.strings['ORDERS']['QUALITY_ORDERED']}</label>
                                            <input
                                                type="number"
                                                placeholder=""
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
                                            <label>{window.strings['ORDERS']['TO_BE_ADJUSTED']}</label>
                                            <input
                                                type="number"
                                                placeholder=""
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="row m-0">
                        <div className="main-wrapper col-md-3">customer ID
                        </div>
                        <div className="main-wrapper col-md-3">customer ID
                        </div>
                        <div className="main-wrapper col-md-3">customer ID
                        </div>
                        <div className="main-wrapper col-md-3">customer ID
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps, {})(FetchShippingAdjustment);
