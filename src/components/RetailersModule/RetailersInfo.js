import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Steps, Button, message } from 'antd';
import 'antd/dist/antd.css';
import classnames from 'classnames';
import { connect } from 'react-redux';
import store from '../../store/store';
import { RETAILER_CREATE_SUCCESS } from '../../constants/actionTypes';
import { fetchRetailers, SubmitRetailer, getCountryList, getStateCity } from '../../actions/SubmitRetailerAction';
import { path } from '../../constants';
import { imageBaseUrl } from '../../config'
import { toastr } from 'react-redux-toastr'
// import GoogleMap from '../../shared/GoogleMap'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

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
            editpage: false
        };
    }
    componentDidMount() {
        // this.getCountries();
        this.getStateList();
        if (this.props.location && this.props.location.state && this.props.location.state.retailerId) {
            this.setState({ editpage: true })
            let user = {};
            user.retailerId = this.props.location.state.retailerId;
            user.isEdit = true;
            this.props.fetchRetailers(user);
        }
    }
    getCountries() {
        this.props.getCountryList()
    }
    getStateList() {
        let obj = {
            "countryId": 101
        }
        getStateCity({ obj }).then(resp => {
            this.setState({ stateData: resp && resp.data })
        })
    }
    retailersubmit() {
        this.setState({
            Shopsubmitted: true
        })
        if (this.state.shopname && this.state.shopaddress1 && this.state.shopaddress2 && this.state.shoplocation && this.state.retPersonalImage && this.state.retShopImage && this.state.agentId) {
            // && this.state.retPersonalImagefile && this.state.retShopImgfile
            const formData = new FormData();
            formData.append("userId", this.state.userId);
            formData.append("name", this.state.name);
            formData.append("role", "retailer");
            formData.append("emailId", this.state.emailId);
            formData.append("agentId", this.state.agentId);
            formData.append("mobileNumber", this.state.mobileNumber);
            formData.append("address1", this.state.address1);
            formData.append("city", this.state.city);
            formData.append("state", this.state.state);
            formData.append("image", this.state.retPersonalImagefile);
            formData.append("shopImage", this.state.retShopImagefile);
            formData.append("shopName", this.state.shopname);
            formData.append("shopAddress1", this.state.shopaddress1);
            formData.append("shopAddress2", this.state.shopaddress2);
            formData.append("shopLocation", this.state.shoplocation);
            formData.append("shopGst", this.state.gst);
            formData.append("shopCountry", 101);//this.state.country
            formData.append("shopState", this.state.state);
            formData.append("shopCity", this.state.city);
            formData.append("shopZipCode", this.state.pincode);
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
            this.props.history.push(path.user.list);
        } if (nextprops && nextprops.editLists.id) {
            if (nextprops.editLists.shopAddress && nextprops.editLists.shopAddress.country) {
                let obj = {
                    // "countryId": this.state.country,
                    "countryId": nextprops.editLists.shopAddress.country,
                    "stateId": nextprops.editLists.shopAddress.state
                }
                getStateCity(obj).then(resp => {
                    if (obj.countryId && obj.stateId) {
                        this.setState({ cityData: resp && resp.data })
                    } else {
                        this.setState({ stateData: resp && resp.data })
                    }
                })
            }
            let retailerData = nextprops.editLists;
            if (retailerData) {
                this.RetlrStateUpdate(retailerData);
            }
        }
    }
    RetlrStateUpdate(retailerData) {
        this.setState({
            userId: retailerData.id, name: retailerData.name,
            emailId: retailerData.emailId, address1: retailerData.address && retailerData.address.address1,
            address2: retailerData.address && retailerData.address.address2, retPersonalImage: retailerData.image,
            mobileNumber: retailerData.mobileNumber, shopname: retailerData.shopAddress && retailerData.shopAddress.name,
            cusId: retailerData.cusId, agentId: retailerData.agentId,
            shopaddress1: retailerData.shopAddress && retailerData.shopAddress.address1,
            shopaddress2: retailerData.shopAddress && retailerData.shopAddress.address2,
            city: retailerData.shopAddress && retailerData.shopAddress.city,
            state: retailerData.shopAddress && retailerData.shopAddress.state,
            country: retailerData.shopAddress && retailerData.shopAddress.country,
            pincode: retailerData.shopAddress && retailerData.shopAddress.zipcode,
            retShopImage: retailerData.shopAddress && retailerData.shopAddress.image,
            gst: retailerData.shopAddress && retailerData.shopAddress.gst, shoplocation: retailerData.shopAddress && retailerData.shopAddress.location,
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
        // if (this.state.name && this.state.address1 && this.state.mobileNumber && this.state.retPersonalImage) {
        //     //, this.state.retPersonalImagefile
        //     const current = this.state.current + 1;
        //     this.setState({ current });
        // }
        const current = this.state.current + 1;
        this.setState({ current });
    }
    listPath = () => {
        this.props.history.goBack();
    }
    handleInputChange = (e) => {
        let obj = {};
        this.setState({
            [e.target.name]: e.target.value
        })
        // if (e.target.name == "country") {
        //     this.setState({ cityData: "" })
        //     obj = {
        //         "countryId": e.target.value
        //     }
        // }
        if (e.target.name == "state") {
            obj = {
                // "countryId": this.state.country,
                "countryId": 101,
                "stateId": e.target.value
            }
        }
        if (Object.keys(obj).length != 0) {
            getStateCity(obj).then(resp => {
                if (obj.countryId && obj.stateId) {
                    this.setState({ cityData: resp && resp.data })
                } else {
                    this.setState({ stateData: resp && resp.data })
                }
            })
        }
    }
    onhandleImageChange = (type, e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            if (type == "retPersonalImage") {
                this.setState({
                    retPersonalImagefile: file,
                    retPersonalImage: file.name,
                    RetPerosnalimagePrewUrl: reader.result
                })
            } else {
                this.setState({
                    retShopImagefile: file,
                    retShopImage: file.name,
                    RetShopimagePrewUrl: reader.result
                })
            }
        }
        reader.readAsDataURL(file)
    }
    // onhandleImageChange = (e) => {

    //     e.preventDefault();
    //     let reader = new FileReader();
    //     let file = e.target.files[0];

    //     reader.onloadend = () => {
    //         this.setState({
    //             file: file,
    //             image: file.name,
    //             imagePreviewUrl: reader.result
    //         })
    //     }
    //     reader.readAsDataURL(file)
    // }
    render() {
        const { current } = this.state;
        const { errors } = this.state;
        let { RetPerosnalimagePrewUrl, RetShopimagePrewUrl } = this.state;
        let retailPersonalimagePreview, retailShopimagePreview;
        if (RetPerosnalimagePrewUrl) {
            retailPersonalimagePreview = <img className="pre-view" src={RetPerosnalimagePrewUrl} />
        } else {
            retailPersonalimagePreview = <img className="pre-view" src={imageBaseUrl + this.state.retPersonalImage} />
        }
        if (RetShopimagePrewUrl) {
            retailShopimagePreview = <img className="pre-view" src={RetShopimagePrewUrl} />
        } else {
            retailShopimagePreview = <img className="pre-view" src={imageBaseUrl + this.state.retShopImage} />
        }
        const countryDropDown = this.state.countries && this.state.countries.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });
        const stateDropDown = this.state.stateData && this.state.stateData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });
        const cityDropDown = this.state.cityData && this.state.cityData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });
        return (
            <div>
                <h4 className="user-title">{window.strings.RETAILERS.ADD_NEW_RETAIER}</h4>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="main-wrapper mt-3">
                    {this.state.current === 0 ?
                        <div className="clearfix ">
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    {/* <h3>{this.state.categoryId ? window.strings['CROP']['EDITTITLE'] : window.strings['CROP']['CREATETITLE']}</h3> */}
                                    <div className="col-md-8">
                                        <div className="clearfix">
                                            <div className="retailer-info">
                                                <form onSubmit={this.handleSubmit} noValidate className="row">
                                                    <div className="form-group pt-3 col-md-6">
                                                        <label className="retallable">{window.strings.FARMERS.NAME}</label>
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
                                                        {this.state.submitted && !this.state.name && <div className="mandatory"> {window.strings.FARMERS.NAME + window.strings['ISREQUIRED']}</div>}

                                                    </div>
                                                    <div className="form-group pt-3 col-md-6">
                                                        <label className="retallable">{window.strings.FARMERS.EMAIL}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Email"
                                                            className={classnames('form-control', {
                                                                'is-invalid': errors.emailId
                                                            })}
                                                            name="emailId"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.emailId}
                                                            required

                                                        />
                                                        {this.state.submitted && !this.state.emailId && <div className="mandatory"> {window.strings.FARMERS.EMAIL + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                    <div className="form-group pt-3 col-md-6">
                                                        <label className="retallable">{window.strings.FARMERS.PHON_NO}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Phone Number"
                                                            className={classnames('form-control', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="mobileNumber"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.mobileNumber}
                                                            required

                                                        />
                                                        {this.state.submitted && !this.state.mobileNumber && <div className="mandatory"> {window.strings.FARMERS.PHON_NO + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                    <div className="form-group pt-3 col-md-6">
                                                        <label className="retallable">{window.strings.FARMERS.ADDR}</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Address"
                                                            className={classnames('form-control', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="address1"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.address1}
                                                            required

                                                        />
                                                        {this.state.submitted && !this.state.address1 && <div className="mandatory"> {window.strings.FARMERS.ADDR + window.strings['ISREQUIRED']}</div>}
                                                    </div>
                                                    <div className="form-group pt-3 col-md-6">
                                                        <label className="retallable">{window.strings.RETAILERS.RET_PERS_IMG_UPLOAD}</label>
                                                        <input
                                                            type="file"
                                                            placeholder="Retailer Personal Image"
                                                            className={classnames('form-control', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="retPersonalImagefile"
                                                            onChange={(e) => this.onhandleImageChange("retPersonalImage", e)}
                                                            //onChange={this.onhandleImageChange()}
                                                            //value={this.state.retPersonalImagefile}
                                                            required

                                                        />
                                                        {this.state.submitted && !this.state.retPersonalImage && <div className="mandatory">{window.strings['FARMERS']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                                        {retailPersonalimagePreview}
                                                    </div>
                                                    {this.state.editpage && <div className="form-group pt-3 col-md-6">
                                                        <label className="retallable">{window.strings.RETAILERS.CUSID}</label><br></br>
                                                        <input
                                                            type="text"
                                                            placeholder="Customer ID"
                                                            className={classnames('form-control', {
                                                                'is-invalid': errors.name
                                                            })}
                                                            name="customerId"
                                                            disabled={true}
                                                            value={this.state.cusId}
                                                        />
                                                    </div>}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <div className="clearfix ">
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    {/* <h3>{this.state.categoryId ? window.strings['CROP']['EDITTITLE'] : window.strings['CROP']['CREATETITLE']}</h3> */}
                                    <div className="">
                                        <div className="clearfix">
                                            <form onSubmit={this.handleSubmit} noValidate className="row m-0">
                                                <div className="main-shop col-md-6 pt-3">
                                                    <div className="row contact">
                                                        <div className="form-group col-md-6">
                                                            <label className="retallable">{window.strings.RETAILERS.SHOP_NAME}</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Shop Name"
                                                                className={classnames('form-control', {
                                                                    'is-invalid': errors.name
                                                                })}
                                                                name="shopname"
                                                                onChange={this.handleInputChange}
                                                                value={this.state.shopname}
                                                                required
                                                            />
                                                            {this.state.Shopsubmitted && !this.state.shopname && <div className="mandatory"> {window.strings.RETAILERS.SHOP_NAME + window.strings['ISREQUIRED']}</div>}
                                                        </div>

                                                        <div className="form-group col-md-6">
                                                            <label className="retallable">{window.strings.RETAILERS.GST}</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Gst"
                                                                className={classnames('form-control', {
                                                                    'is-invalid': errors.name
                                                                })}
                                                                name="gst"
                                                                onChange={this.handleInputChange}
                                                                value={this.state.gst}
                                                                required

                                                            />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label className="retallable">{window.strings.RETAILERS.RET_SHOP_IMG_UPLOAD}</label>
                                                            <input
                                                                type="file"
                                                                placeholder="Image"
                                                                className={classnames('form-control p-0', {
                                                                    'is-invalid': errors.name
                                                                })}
                                                                name="retShopImage"
                                                                onChange={(e) => this.onhandleImageChange("retShopImage", e)}
                                                                value={this.state.retShopImgName}
                                                                required

                                                            />
                                                            {this.state.Shopsubmitted && !this.state.retShopImage && <div className="mandatory">{window.strings['FARMERS']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                                            {retailShopimagePreview}
                                                        </div>
                                                        <div className="form-group  col-md-6">
                                                            <label className="retallable">{window.strings.RETAILERS.AGENTID}</label><br></br>
                                                            <input
                                                                type="text"
                                                                placeholder="AGENT ID"
                                                                className={classnames('form-control', {
                                                                    'is-invalid': errors.name
                                                                })}
                                                                name="agentId"
                                                                onChange={this.handleInputChange}
                                                                value={this.state.agentId}
                                                            />
                                                            {this.state.Shopsubmitted && !this.state.agentId && <div className="mandatory"> {window.strings.RETAILERS.AGENTID + window.strings['ISREQUIRED']}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sub-shop col-md-6 pt-4">
                                                    <div className="row contact">
                                                        <div className="form-group col-md-6">
                                                            <label className="retallable">{window.strings.FARMERS.ADDR_1}</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Address 1"
                                                                className={classnames('form-control', {
                                                                    'is-invalid': errors.name
                                                                })}
                                                                name="shopaddress1"
                                                                onChange={this.handleInputChange}
                                                                value={this.state.shopaddress1}
                                                                required

                                                            />
                                                            {this.state.Shopsubmitted && !this.state.shopaddress1 && <div className="mandatory"> {window.strings.FARMERS.ADDR_1 + window.strings['ISREQUIRED']}</div>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label className="retallable">{window.strings.FARMERS.ADDR_2}</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Address 2"
                                                                className={classnames('form-control', {
                                                                    'is-invalid': errors.name
                                                                })}
                                                                name="shopaddress2"
                                                                onChange={this.handleInputChange}
                                                                value={this.state.shopaddress2}
                                                                required

                                                            />
                                                            {this.state.Shopsubmitted && !this.state.shopaddress2 && <div className="mandatory">{window.strings.FARMERS.ADDR_2 + window.strings['ISREQUIRED']}</div>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label className="retallable">{window.strings.COUNTRY}</label>
                                                            <select required name="country" value={this.state.country} className="form-control" onChange={this.handleInputChange}>
                                                                {/* <option value="0">Select Country</option> */}
                                                                <option value="101">INDIA</option>
                                                                {/* {countryDropDown} */}
                                                            </select>
                                                            {/* {this.state.Shopsubmitted && !this.state.country && <div className="mandatory">{window.strings.COUNTRY + window.strings['ISREQUIRED']}</div>} */}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label className="retallable">{window.strings['FARMERS']['STATE']}</label>
                                                            <select required name="state" value={this.state.state} className="form-control" onChange={this.handleInputChange}>
                                                                <option value="0">Select State</option>{stateDropDown}
                                                            </select>
                                                            {/* {this.state.Shopsubmitted && !this.state.state && <div className="mandatory">{window.strings['FARMERS']['STATE'] + window.strings['ISREQUIRED']}</div>} */}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label className="retallable">{window.strings['FARMERS']['CITY']}</label>
                                                            <select required name="city" value={this.state.city} className="form-control" onChange={this.handleInputChange}>
                                                                <option value="0">Select City</option>{cityDropDown}
                                                            </select>
                                                            {/* {this.state.Shopsubmitted && !this.state.city && <div className="mandatory">{window.strings['FARMERS']['CITY'] + window.strings['ISREQUIRED']}</div>} */}
                                                        </div>

                                                        <div className="form-group col-md-6">
                                                            <label className="retallable">{window.strings['FARMERS']['POST_CODE']}</label>
                                                            <input
                                                                type="number"
                                                                placeholder={window.strings['FARMERS']['POST_CODE']}
                                                                className={classnames('form-control', {
                                                                    'is-invalid': errors.postCode
                                                                })}
                                                                name="pincode"
                                                                onChange={this.handleInputChange}
                                                                value={this.state.pincode}
                                                                required
                                                            />
                                                            {this.state.Shopsubmitted && !this.state.pincode && <div className="mandatory">{window.strings['FARMERS']['POST_CODE'] + window.strings['ISREQUIRED']}</div>}
                                                        </div>

                                                        <div className="form-group col-md-6">
                                                            {/* pt-3 */}
                                                            <label className="retallable">{window.strings.RETAILERS.SELECT_SHOP_LOC}</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Shop Location"
                                                                className={classnames('form-control', {
                                                                    'is-invalid': errors.name
                                                                })}
                                                                name="shoplocation"
                                                                onChange={this.handleInputChange}
                                                                value={this.state.shoplocation}
                                                                required

                                                            />
                                                            {this.state.Shopsubmitted && !this.state.shoplocation && <div className="mandatory">{window.strings.RETAILERS.SHOP_LOC + window.strings['ISREQUIRED']}</div>}
                                                        </div>
                                                        {/* <GoogleMap /> */}


                                                    </div>
                                                </div>
                                                {/* <div className="form-group pt-3">
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
                                                    </div> */}
                                                {/* <div className="form-group pt-3">
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
                                                    </div> */}
                                            </form>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>}
                    {/* <div className="col-md-12 bottom-section p-4">
                        <button type="button" className="btn btn-default" onClick={this.listPath}>{window.strings.CANCEL}</button>
                        <button type="submit" className="btn btn-primary">Next</button>
                    </div> */}
                    <div className="col-md-12 bottom-section m-0">
                        <Button className="btn btn-default mb-2" onClick={() => this.listPath()}>{window.strings.CANCEL}
                        </Button>
                        {current < steps.length - 1 && (
                            <Button type="primary" className="btn btn-primary mb-2" onClick={() => this.next()}>
                                Next
                    </Button>
                        )}
                        {current > 0 && (
                            <Button className="btn btn-default mb-2" onClick={() => this.prev()}>
                                Previous
                    </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button className="btn btn-primary mb-2" type="primary" onClick={() => this.retailersubmit()}>

                                Submit
                    </Button>
                        )}
                    </div>
                </div>
                {/* <div className="steps-action">
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
                </div> */}
            </div >
        );
    }
}

RetailerInfo.propTypes = {
    onSubmit: PropTypes.func
};
const mapStateToProps = state => ({
    editLists: state.retailer.Lists,
    status: state.retailer.status,
    message: state.retailer.message,
    apiKey: ('AIzaSyC0OQRouIeF8m6n0brmgidHUQtT_BPguAY'),
    libraries: ['drawing'],
    libraries: ['places'],
    mapTypeId: ['satellite'],
});
export default connect(mapStateToProps, { SubmitRetailer, fetchRetailers })(RetailerInfo);

