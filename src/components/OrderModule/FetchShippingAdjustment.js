import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Select from 'react-select';
import { getPriceList } from '../../actions/priceAction'

class FetchShippingAdjustment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }

    componentDidMount() {
        // agentDataList
    }

    componentWillReceiveProps(newProps) {
        if (newProps.priceData && newProps.priceData.Lists && newProps.priceData.Lists.datas) {
            let respData = newProps.priceData.Lists.datas;
            this.setState({ PriceLists: respData, pageCount: newProps.priceData.Lists.totalCount / this.state.itemPerPage })
        }
    }

    getProductList = () => {
        let obj = {
            "pages": this.state.currentPage ? this.state.currentPage : 0,
            "rows": this.state.itemPerPage,
            "search": this.state.search,
            "dCCode": this.state.dCCode
        }
        this.props.getPriceList(obj)
    }

    render() {
        const { errors } = this.state;

        let productDropDown = [];

        this.state.agentDataList && this.state.agentDataList.map((item) => {
            let obj = { "label": item.agentName, "value": item.agentId, "name": "agentName" };
            productDropDown.push(obj);

        })

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
                                            {/* <select required name="parentId" className="form-control order-text" value={this.state.parentId} onChange={this.handleCategoryChange}>
                                                <option value="0">Select Product ID</option>
                                            </select> */}


                                            <Select
                                                // styles={{
                                                //     control: base => ({
                                                //         ...base,
                                                //         borderColor: 'hsl(0,0%,80%)',
                                                //         boxShadow: '#FE988D',
                                                //         '&:hover': {
                                                //             borderColor: '#FE988D'
                                                //         }
                                                //     })
                                                // }}
                                                className="city-box ml-1"
                                                value={this.state.selectedAgentOption}
                                                onChange={(e) => this.handleAgentChange(e)}
                                                // options={productDropDown}
                                                placeholder="--Select Agent--"
                                            />


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
                    <div className="row">
                        <div className="col-md-3">
                            <div className="main-wrapper ship">
                                customer ID
                                <div className="row m-0 ship-box">
                                    <div className="col-md-3 minus-circle">
                                        <i class="fa fa-minus-circle"></i>
                                    </div>
                                    <div className="col-md-6 order-quantity">
                                        10
                                    </div>
                                    <div className="col-md-3 plus-circle">
                                        <i class="fa fa-plus-circle"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="main-wrapper ship">
                                customer ID
                                <div className="row m-0 ship-box">
                                    <div className="col-md-3 minus-circle">
                                        <i class="fa fa-minus-circle"></i>
                                    </div>
                                    <div className="col-md-6 order-quantity">
                                        10
                                    </div>
                                    <div className="col-md-3 plus-circle">
                                        <i class="fa fa-plus-circle"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="main-wrapper ship">
                                customer ID
                                <div className="row m-0 ship-box">
                                    <div className="col-md-3 minus-circle">
                                        <i class="fa fa-minus-circle"></i>
                                    </div>
                                    <div className="col-md-6 order-quantity">
                                        10
                                    </div>
                                    <div className="col-md-3 plus-circle">
                                        <i class="fa fa-plus-circle"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="main-wrapper ship">
                                customer ID
                                <div className="row m-0 ship-box">
                                    <div className="col-md-3 minus-circle">
                                        <i class="fa fa-minus-circle"></i>
                                    </div>
                                    <div className="col-md-6 order-quantity">
                                        10
                                    </div>
                                    <div className="col-md-3 plus-circle">
                                        <i class="fa fa-plus-circle"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="text-right mt-3">
                    <button className="common-btn pl-1">Next<i class="fa fa-arrow-right"></i></button>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        priceData: state.price ? state.price : {}
    };
}
export default connect(mapStateToProps, { getPriceList })(FetchShippingAdjustment);
