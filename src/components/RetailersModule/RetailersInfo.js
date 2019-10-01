import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Steps, Button, message } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import classnames from 'classnames';
import { connect } from 'react-redux';
import store from '../../store/store';
import { RETAILER_CREATE_SUCCESS } from '../../constants/actionTypes';
import { fetchRetailers, SubmitRetailer } from '../../actions/SubmitRetailerAction';

import { toastr } from 'react-redux-toastr'
const { Step } = Steps;
const steps = [
    {
        title: 'Personal Information',
    },
    {
        title: 'Shop Details',
    }
];
class RetailerInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            retShopImgfile: '',
            retShopImgName: '',
            shopname: '',
            errors: {},
            shopaddress1: '',
            shopaddress2: '',
            gst: '',
            shoplocation: '',
        };
    }
    componentDidMount() {
        console.log("---Retailer this.props", this.props);
        if (this.props.location && this.props.location.state && this.props.location.state.retailerId) {
            let user = {};
            user.retailerId = this.props.location.state.retailerId;
            user.isEdit = true;
            this.props.fetchRetailers(user);
        }
    }
    retailersubmit() {
        this.setState({
            Shopsubmitted: true
        })
        if (this.state.shopname && this.state.shopaddress1 && this.state.shopaddress2 && this.state.shoplocation && this.state.retPersonalImagefile && this.state.retShopImgfile) {
            // && this.state.retPersonalImagefile && this.state.retShopImgfile
            const formData = new FormData();
            formData.append("userId", this.state.userId);
            formData.append("name", this.state.name);
            formData.append("role", "retailer");
            formData.append("emailId", this.state.emailId);
            formData.append("mobileNumber", this.state.mobileNumber);
            formData.append("address1", this.state.address1);
            formData.append("image", this.state.retPersonalImagefile);
            formData.append("shopImage", this.state.retShopImgfile);
            formData.append("shopName", this.state.shopname);
            formData.append("shopAddress1", this.state.shopaddress1);
            formData.append("shopAddress2", this.state.shopaddress2);
            formData.append("shopLocation", this.state.shoplocation);
            formData.append("shopGst", this.state.gst);
            let updateRetailer = false;
            if (this.state.userId) {
                updateRetailer = true;
            }
            this.props.SubmitRetailer(formData, updateRetailer);
        }
    }
    componentWillReceiveProps(nextprops, newProps) {
        if (parseInt(nextprops.status) == 200) {
            store.dispatch({ type: RETAILER_CREATE_SUCCESS, status: '' })
            toastr.success(nextprops.message);
            this.props.history.push("/user");
        } else {
            this.setState({ data: nextprops.editLists });
            if (nextprops && nextprops.editLists) {
                let retailerData = nextprops.editLists;
                if (retailerData) {
                    this.RetlrStateUpdate(retailerData);
                }
            }
        }
    }
    RetlrStateUpdate(retailerData) {
        this.setState({
            userId: retailerData.id, name: retailerData.name,
            emailId: retailerData.emailId, address1: retailerData.address && retailerData.address.address1,
            address2: retailerData.address && retailerData.address.address2, retPersonalImage: retailerData.image,
            mobileNumber: retailerData.mobileNumber, shopname: retailerData.shopAddress && retailerData.shopAddress.name,
            shopaddress1: retailerData.shopAddress && retailerData.shopAddress.address1,
            shopaddress2: retailerData.shopAddress && retailerData.shopAddress.address2,
            retShopImgfile: retailerData.shopAddress && retailerData.shopAddress.image,
            gst: retailerData.shopAddress && retailerData.shopAddress.gst, shoplocation: retailerData.shopAddress && retailerData.shopAddress.location,
            city: retailerData.city, state: retailerData.state, pinCode: retailerData.zipcode
        })
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    next() {
        this.setState({
            submitted: true,
        })
        if (this.state.name && this.state.address1 && this.state.mobileNumber, this.state.retPersonalImagefile) {
            //, this.state.retPersonalImagefile
            const current = this.state.current + 1;
            this.setState({ current });
        }
    }
    listPath = () => {
        this.props.history.goBack();
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onhandleImageChange = (type, e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            if (type == "retPersonalImage") {
                this.setState({ retPersonalImagefile: file })
            } else {
                this.setState({ retShopImgfile: file })
            }
        }
        reader.readAsDataURL(file)
    }
    render() {
        const { current } = this.state;
        const { errors } = this.state;
        return (
            <div>
                <h3>{window.strings.RETAILERS.ADD_NEW_RETAIER}</h3>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">
                    {this.state.current === 0 ?
                        <div className="clearfix ">
                            <div className="row clearfix">
                                <div className="col-md-10">
                                    {/* <h3>{this.state.categoryId ? window.strings['CROP']['EDITTITLE'] : window.strings['CROP']['CREATETITLE']}</h3> */}
                                    <div className="col-md-6 ">
                                        <div className="p-5 clearfix">
                                            <div className="">
                                                <form onSubmit={this.handleSubmit} noValidate>
                                                    <div className="form-group pt-3">
                                                        <label className="retallable">{window.strings.FARMERS.NAME}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="NAME"
                                                            className={classnames('form-control form-control-lg', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="name"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.name}
                                                            required

                                                        />
                                                        {this.state.submitted && !this.state.name && <div className="mandatory"> {window.strings.FARMERS.NAME + window.strings['ISREQUIRED']}</div>}

                                                    </div>
                                                    <div className="form-group pt-3">
                                                        <label className="retallable">{window.strings.FARMERS.EMAIL}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="EMAIL"
                                                            className={classnames('form-control form-control-lg', {
                                                                'is-invalid': errors.emailId
                                                            })}
                                                            name="emailId"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.emailId}
                                                            required

                                                        />
                                                        {this.state.submitted && !this.state.emailId && <div className="mandatory"> {window.strings.FARMERS.EMAIL + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                    <div className="form-group pt-3">
                                                        <label className="retallable">{window.strings.FARMERS.PHON_NO}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Phone Number"
                                                            className={classnames('form-control form-control-lg', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="mobileNumber"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.mobileNumber}
                                                            required

                                                        />
                                                        {this.state.submitted && !this.state.mobileNumber && <div className="mandatory"> {window.strings.FARMERS.PHON_NO + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                    <div className="form-group pt-3">
                                                        <label className="retallable">{window.strings.FARMERS.ADDR}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Address"
                                                            className={classnames('form-control form-control-lg', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="address1"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.address1}
                                                            required

                                                        />
                                                        {this.state.submitted && !this.state.address1 && <div className="mandatory"> {window.strings.FARMERS.ADDR + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                    <div className="form-group pt-3">
                                                        <label className="retallable">{window.strings.RETAILERS.IMG_UPLOAD}</label>
                                                        <input
                                                            type="file"
                                                            placeholder="Retailer Personal Image"
                                                            className={classnames('form-control form-control-lg', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="retPersonalImage"
                                                            onChange={(e) => this.onhandleImageChange("retPersonalImage", e)}
                                                            //onChange={this.onhandleImageChange()}
                                                            //value={this.state.retPersonalImagefile}
                                                            required

                                                        />
                                                        {this.state.submitted && !this.state.retPersonalImagefile && <div className="mandatory">{window.strings['FARMERS']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <div className="clearfix ">
                            <div className="row clearfix">
                                <div className="col-md-10">
                                    {/* <h3>{this.state.categoryId ? window.strings['CROP']['EDITTITLE'] : window.strings['CROP']['CREATETITLE']}</h3> */}
                                    <div className="col-md-6 ">
                                        <div className="p-5 clearfix">
                                            <div className="">
                                                <form onSubmit={this.handleSubmit} noValidate>
                                                    <div className="form-group pt-3">
                                                        <label className="retallable">{window.strings.RETAILERS.SHOP_NAME}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="SHOP NAME"
                                                            className={classnames('form-control form-control-lg', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="shopname"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.shopname}
                                                            required
                                                        />
                                                        {this.state.Shopsubmitted && !this.state.shopname && <div className="mandatory"> {window.strings.RETAILERS.SHOP_NAME + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                    <div className="form-group pt-3">
                                                        <label className="retallable">{window.strings.FARMERS.ADDR_1}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="ADDRESS 1"
                                                            className={classnames('form-control form-control-lg', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="shopaddress1"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.shopaddress1}
                                                            required

                                                        />
                                                        {this.state.Shopsubmitted && !this.state.shopaddress1 && <div className="mandatory"> {window.strings.FARMERS.ADDR_1 + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                    <div className="form-group pt-3">
                                                        <label className="retallable">{window.strings.FARMERS.ADDR_2}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="ADDRESS 2"
                                                            className={classnames('form-control form-control-lg', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="shopaddress2"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.shopaddress2}
                                                            required

                                                        />
                                                        {this.state.Shopsubmitted && !this.state.shopaddress2 && <div className="mandatory">{window.strings.FARMERS.ADDR_2 + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                    <div className="form-group pt-3">
                                                        <label className="retallable">{window.strings.RETAILERS.GST}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="GST"
                                                            className={classnames('form-control form-control-lg', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="gst"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.gst}
                                                            required

                                                        />
                                                    </div>
                                                    <div className="form-group pt-3">
                                                        <label className="retallable">{window.strings.RETAILERS.SELECT_SHOP_LOC}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="SHOP LOCATION"
                                                            className={classnames('form-control form-control-lg', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="shoplocation"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.shoplocation}
                                                            required

                                                        />
                                                        {this.state.Shopsubmitted && !this.state.shoplocation && <div className="mandatory">{window.strings.RETAILERS.SHOP_LOC + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                    <div className="form-group pt-3">
                                                        <label className="retallable">{window.strings.RETAILERS.IMG_UPLOAD}</label>
                                                        <input
                                                            type="file"
                                                            placeholder="image"
                                                            className={classnames('form-control form-control-lg', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="retShopImage"
                                                            onChange={(e) => this.onhandleImageChange("retShopImage", e)}
                                                            value={this.state.retShopImgName}
                                                            required

                                                        />
                                                        {this.state.Shopsubmitted && !this.state.retShopImgfile && <div className="mandatory">{window.strings['FARMERS']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}

                </div>
                <div className="steps-action">
                    <Button className="bottom-section" style={{ marginRight: 10, background: '#E1E7ED' }} onClick={() => this.listPath()}>{window.strings.CANCEL}
                    </Button>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                </Button>
                    )}
                    {current > 0 && (
                        <Button onClick={() => this.prev()}>
                            Previous
                </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button style={{ marginLeft: 8 }} type="primary" onClick={() => this.retailersubmit()}>

                            Submit
                </Button>
                    )}
                </div>
            </div>
        );
    }
}

RetailerInfo.propTypes = {
    onSubmit: PropTypes.func
};
const mapStateToProps = state => ({
    editLists: state.retailer.Lists,
    status: state.retailer.status,
    message: state.retailer.message
});
export default connect(mapStateToProps, { SubmitRetailer, fetchRetailers })(RetailerInfo);