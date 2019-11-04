import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import store from '../../store/store';
import { getSpecificCouponData, SubmitCoupon } from '../../actions/couponAction'
import { formatDate } from '../../shared/DateFormat'
import { COUPON_CREATE_SUCCESS, COUPON_UPDATE_SUCCESS } from '../../constants/actionTypes'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { fetchUsers } from '../../actions/UserAction';
import noimg from '../../assets/noimage/Avatar_farmer.png'
import { imageBaseUrl } from '../../config'

class CreateCoupon extends Component {

    constructor(props) {
        super(props);
        var today = new Date(),
            dateValue = today.getDate() >= 10 ? today.getDate() : ('0' + today.getDate()),
            monthValue = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : ('0' + today.getMonth() + 1),
            date = today.getFullYear() + '-' + monthValue + '-' + dateValue

        this.state = {
            submitted: false,
            errors: {},
            name: '',
            startDate: '',
            expiryDate: '',
            description: '',
            amount: '',
            Date: date
        }
    }

    componentDidMount() {
        this.fetchUsers();
        if (this.props.location && this.props.location.state && this.props.location.state.couponId) {
            this.setState({ couponId: this.props.location.state.couponId })
            this.getSpecificCouponData();
        }
    }

    fetchUsers() {
        let user = {
            "roleId": 3
        };
        this.props.fetchUsers(user);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.addCoupon && nextProps.addCoupon.createdStatus == "200") {
            store.dispatch({ type: COUPON_CREATE_SUCCESS, resp: "" })
            this.props.history.push(path.coupons.list);
        }

        if (nextProps.addCoupon && nextProps.addCoupon.updatedStatus == "200") {
            store.dispatch({ type: COUPON_UPDATE_SUCCESS, resp: "" })
            this.props.history.push(path.coupons.list)
        }

        if (this.state.couponId && nextProps.addCoupon && nextProps.addCoupon.specificData && nextProps.addCoupon.specificData.datas && nextProps.addCoupon.specificData.datas[0]) {
            let Data = nextProps.addCoupon.specificData.datas[0];
            let couponDate = Data.startDate
            this.setState({
                name: Data.name, parentId: Data.discountUnit, amount: Data.discountValue,
                startDate: formatDate(Data.startDate, couponDate), expiryDate: formatDate(Data.expiryDate, couponDate), description: Data.description
            })
        }

        if (nextProps.user && nextProps.user.userList && nextProps.user.userList.datas) {
            this.setState({ userData: nextProps.user.userList.datas })
        }
    }

    handleChange = (e) => {
        if (e.target.value < 0) {

        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    onhandleImageChange = (e) => {

        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                image: file.name,
                imagePreviewUrl: reader.result

            })
        }
        reader.readAsDataURL(file)


    }

    getSpecificCouponData() {

        if (this.props.location && this.props.location.state && this.props.location.state.couponId) {
            let id = this.props.location.state.couponId;
            this.setState({ couponId: id });
            this.props.getSpecificCouponData(this.props.location.state.couponId);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })

        if (this.state.name && this.state.parentId && this.state.amount > 0) {

            const formData = new FormData();

            formData.append("name", this.state.name);
            formData.append("code", "me20i10L");
            formData.append("startDate", this.state.startDate);
            formData.append("expiryDate", this.state.expiryDate);
            formData.append("discountValue", this.state.amount);
            formData.append("discountUnit", this.state.parentId);
            formData.append("status", '1');
            formData.append("description", this.state.description);
            formData.append("id", this.state.couponId);
            this.props.SubmitCoupon(formData, this.state.couponId);
        }

    }

    listPage = () => {
        this.props.history.push({ pathname: path.coupons.list })
    }

    getSpecificCouponData() {
        if (this.props.location && this.props.location.state && this.props.location.state.couponId) {
            let id = this.props.location.state.couponId;
            this.setState({ couponId: id })

            this.props.getSpecificCouponData(this.props.location.state.couponId)

        }
    }

    checkbox(value) {

    }

    render() {
        const { errors } = this.state;
        let { imagePreviewUrl } = this.state;
        let imagePreview;
        if (imagePreviewUrl) {
            imagePreview = <img className="pre-view" src={imagePreviewUrl} />
        }
        else if (this.state.image) {
            imagePreview = <img className="pre-view" src={imageBaseUrl + this.state.image} />
        }
        else {
            imagePreview = <img className="pre-view" src={noimg} />
        }

        let dropDownData = [];

        this.state.userData && this.state.userData.map((item) => {

            let obj = { "label": item.userName, "value": item.id };
            dropDownData.push(obj);
        })

        return (
            <div>
                <div className="row clearfix">
                    <div className="col-md-12">
                        <h4 className="user-title">{!this.state.couponId ? window.strings.COUPON.ADD_NEW_COUPON : window.strings.COUPON.EDIT_COUPON}</h4>
                        <div className="box-wrapper main-wrapper">
                            <h4 className="color-title line-wrapper">{window.strings.COUPON.COUPON_DETAILS}</h4>
                            <div className="">
                                <div className="create-coupon col-md-6">
                                    <form onSubmit={this.handleSubmit} noValidate className="row m-0 pt-3">

                                        <div className="form-group col-md-12">

                                            <label>{window.strings.COUPON.COUPON_TITLE}</label>

                                            <input
                                                type="text"
                                                placeholder="Coupon Title"
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
                                                <option value='1'>Percentage</option>
                                                <option value='2'>Discount</option>
                                            </select>

                                            {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['COUPON']['COUPON_TYPE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6 pt-2">

                                            <label>{window.strings.COUPON.COUPON_AMOUNT}</label>

                                            <input
                                                type="number"
                                                placeholder="Coupon Amount"
                                                className={classnames('form-control calendar-icon', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="amount"
                                                onChange={this.handleChange}
                                                value={this.state.amount}
                                                required
                                            />

                                            {this.state.submitted && !this.state.amount && <div className="mandatory">{window.strings['COUPON']['COUPON_AMOUNT'] + window.strings['ISREQUIRED']}</div>}
                                            {this.state.submitted && this.state.amount < 0 && <div className="mandatory">{'Invalid ' + window.strings['COUPON']['COUPON_AMOUNT']}</div>}
                                        </div>

                                        <div className="form-group col-md-6 pt-2">

                                            <label>{window.strings.COUPON.COUPON_START_DATE}</label>

                                            <input
                                                type="date"
                                                placeholder="Start Date"
                                                className={classnames('form-control calendar-icon', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="startDate"
                                                onChange={this.handleChange}
                                                value={this.state.startDate}
                                                min={this.state.Date}
                                                required
                                            />
                                            {this.state.submitted && !this.state.startDate && <div className="mandatory">{window.strings['DATEERROR']['STARTDATE']}</div>}
                                        </div>
                                        <div className="form-group col-md-6 pt-2">

                                            <label>{window.strings.COUPON.COUPON_EXPIRY_DATE}</label>
                                            <input
                                                type="date"
                                                placeholder="Expiry Date"
                                                className={classnames('form-control calendar-icon', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="expiryDate"
                                                onChange={this.handleChange}
                                                value={this.state.expiryDate}
                                                min={this.state.Date}
                                                required

                                            />

                                            {this.state.submitted && !this.state.expiryDate && <div className="mandatory">{window.strings['DATEERROR']['EXPIRYDATE']}</div>}
                                        </div>
                                        <div className="form-group col-md-12 pt-2">
                                            <label>{window.strings.DESCRIPTION}</label>
                                            <textarea
                                                placeholder="Description"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.description
                                                })}
                                                name="description"
                                                onChange={this.handleChange}
                                                value={this.state.description}
                                                required
                                            ></textarea>
                                            {this.state.submitted && !this.state.description && <div className="mandatory">{window.strings['DESCRIPTION'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-12 pt-3">

                                            <label>{window.strings.CATEGORY.IMAGE}</label>

                                            <input
                                                type="file"
                                                placeholder="Image"
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.image
                                                })}
                                                name="image"
                                                onChange={this.onhandleImageChange}
                                                required

                                            />
                                            {imagePreview}
                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                            {/* <img className="pre-view" src={imagePreviewUrl} /> */}
                                        </div>
                                        <div className="form-group col-md-12 pt-2">
                                            <label>User</label>
                                            <ReactMultiSelectCheckboxes options={dropDownData} onChange={this.checkbox} />
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-12 bottom-section">
                                    <button type="button" className="btn btn-default" onClick={this.listPage}>{window.strings.CANCEL}</button>
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
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
    addCoupon: state.coupon ? state.coupon : {},
    user: state.user
})

export default connect(mapStatetoProps, { getSpecificCouponData, SubmitCoupon, fetchUsers })(CreateCoupon)