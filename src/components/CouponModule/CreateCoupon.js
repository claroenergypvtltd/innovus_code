import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import store from '../../store/store';
import { getSpecificCouponData } from '../../actions/couponAction'

class CreateCoupon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.couponId) {
            this.getSpecificCouponData();
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })
    }

    listPage = () => {
        this.props.history.push({ pathname: path.coupons.list })
    }

    getSpecificCouponData() {
        if (this.props.location && this.props.location.state && this.props.location.state.couponId) {
            let id = this.props.location.state.couponId;
            this.setState({ couponid: id })

            this.props.getSpecificCouponData(this.props.location.state.couponId)

        }
    }

    render() {
        const { errors } = this.state;

        const categoryDropDown = this.state.categoryData && this.state.categoryData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });
        return (
            <div>

                <div className="row clearfix">
                    <div className="col-md-12">
                        <h4 className="user-title">{!this.state.couponid ? window.strings.COUPON.ADD_NEW_COUPON : window.strings.COUPON.EDIT_COUPON}</h4>
                        <div className="box-wrapper main-wrapper">
                            <h4 className="color-title line-wrapper">{window.strings.COUPON.COUPON_DETAILS}</h4>
                            <div className="">
                                <div className="create-coupon col-md-8">
                                    <form onSubmit={this.handleSubmit} noValidate className="row m-0 pt-3">

                                        <div className="form-group col-md-12">

                                            <label>{window.strings.COUPON.COUPON_TITLE}</label>

                                            <input
                                                type="text"
                                                placeholder="name"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleChange}
                                                value={this.state.name}
                                                required

                                            />

                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['COUPON']['COUPON_TITLE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6 pt-2">

                                            <label>{window.strings.COUPON.COUPON_TYPE}</label>

                                            <select required name="parentId" className="form-control" value={this.state.parentId} onChange={this.handleChange}>
                                                <option value="0">Select Type</option>
                                                {categoryDropDown}
                                            </select>

                                            {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['COUPON']['COUPON_TYPE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6 pt-2">

                                            <label>{window.strings.COUPON.COUPON_AMOUNT}</label>

                                            <select required name="parentId" className="form-control" value={this.state.parentId} onChange={this.handleInputChange}>
                                                <option value="0">Select Amount</option>
                                                {categoryDropDown}
                                            </select>

                                            {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['COUPON']['COUPON_AMOUNT'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6 pt-2">

                                            <label>{window.strings.COUPON.COUPON_START_DATE}</label>

                                            <input
                                                type="text"
                                                placeholder="Start Date"
                                                className={classnames('form-control calendar-icon', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleInputChange}
                                                value={this.state.name}
                                                required
                                            />
                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['DATEERROR']['STARTDATE']}</div>}
                                        </div>
                                        <div className="form-group col-md-6 pt-2">

                                            <label>{window.strings.COUPON.COUPON_EXPIRY_DATE}</label>
                                            <input
                                                type="text"
                                                placeholder="Expiry Date"
                                                className={classnames('form-control calendar-icon', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleInputChange}
                                                value={this.state.name}
                                                required

                                            />

                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['DATEERROR']['EXPIRYDATE']}</div>}
                                        </div>
                                        <div className="form-group col-md-12 pt-2">
                                            <label>{window.strings.DESCRIPTION}</label>
                                            <textarea
                                                placeholder="Description"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.description
                                                })}
                                                name="description"
                                                onChange={this.handleInputChange}
                                                value={this.state.description}
                                                required
                                            ></textarea>
                                            {this.state.submitted && !this.state.description && <div className="mandatory">{window.strings['DESCRIPTION'] + window.strings['ISREQUIRED']}</div>}
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
                                                {/* <img className="pre-view"></img> */}

                                            </div>

                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['IMAGE'] + window.strings['ISREQUIRED']}</div>}
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

const mapStatetoProps = (state) => ({

    addCoupon: state.coupon

})


export default connect(mapStatetoProps, { getSpecificCouponData })(CreateCoupon)