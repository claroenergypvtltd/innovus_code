import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import PropTypes from "prop-types";
import noimg from '../../assets/noimage/Avatar_farmer.png'
import { updateStatusRetailer, SubmitRetailer } from '../../actions/SubmitRetailerAction';
import { toastr } from '../../services/toastr.services'
import { path } from '../../constants';
import ImageZoom from 'react-medium-image-zoom'
import { connect } from 'react-redux';

class ShopDetails extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            showStatusBtn: true,
            activeButton: false,
            rejectKey: false,
            rotation: 0
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.profileData && newProps.profileData.isActive == "0") {
            this.setState({ activeButton: false });
        } else {
            this.setState({ activeButton: true });
        }
    }
    redirectPage = () => {
        this.context.router.history.goBack();
    }
    updateStatus(RetId, status, isActive) {
        let message = window.strings.UPDATEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => {
                const formData = new FormData();
                formData.append("userId", RetId);
                formData.append("roleId", 2);
                if (isActive == "isActive") {
                    formData.append("isActive", status);
                } else {
                    formData.append("status", status);
                }
                updateStatusRetailer(formData).then(resp => {
                    if (resp && resp.status == 200) {
                        // toastr.success(resp.message);
                        let activeKey;
                        if (this.state.activeButton) {
                            activeKey = false
                        } else {
                            activeKey = true
                        }
                        if (isActive) {
                            this.setState({
                                activeButton: activeKey
                            })
                        } else {
                            this.setState({ showStatusBtn: false });
                        }

                        if (resp.data && resp.data.status == "2") {
                            this.setState({ rejectKey: true });
                        }

                    }
                })
                // this.context.router.history.goBack();
            },
            onCancel: () => { }
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.UPDATERETSTATUS);
    }

    rotateleft = () => {
        let newRotation = this.state.rotation - 90;
        if (newRotation >= 360) {
            newRotation = - 360;
        }
        this.setState({
            rotation: newRotation,
        })
    }
    uploadImage = (shopImg) => {
        let upload = true;
        const formData = new FormData();
        formData.append("image", shopImg);
        formData.append("userId", this.props.profileData.address.userId);
        this.props.SubmitRetailer(formData, upload)
    }

    render() {
        let shopAddLat;
        let shopAddLong
        const profile = this.props.profileData ? this.props.profileData : [];
        let shopAddress1 = profile.shopAddress && profile.shopAddress.address1 ? profile.shopAddress.address1 : '';
        let shopAddress2 = profile.shopAddress && profile.shopAddress.address2 ? profile.shopAddress.address2 : '';
        // let loc = [{ "lat": "9.91783", "long": "78.1213" }]
        // let locc = profile.shopAddress && profile.shopAddress.location.replace(/[\[\]']+/g, '');
        // let splitLoc = locc && locc.split(",");
        // let shopAddressLat = splitLoc && splitLoc[0] ? splitLoc[0].replace(/"/g, "") : '';
        // let shopAddressLng = splitLoc && splitLoc[1] ? splitLoc[1].replace(/"/g, "") : '';

        let shopAddressLat = profile.shopAddress && profile.shopAddress.latitude ? profile.shopAddress.latitude : '';
        let shopAddressLng = profile.shopAddress && profile.shopAddress.longitude ? profile.shopAddress.longitude : '';
        let shopImg = noimg;
        if (profile.shopAddress && profile.shopAddress.image) {
            shopImg = imageBaseUrl + profile.shopAddress.image
        }
        let mapPinString = "http://www.google.com/maps/place/" + shopAddressLat + ',' + shopAddressLng
        // const getname = profile.name.split('_');

        const { rotation } = this.state;
        return (
            <div className="farm-tab p-1 active-box">
                {
                    (profile.status == 0 || profile.status == 1) && !this.state.rejectKey &&
                    <div className="assign-box">
                        {!this.state.activeButton && <button className="active-btn" onClick={(e) => this.updateStatus(profile.id, 1, 'isActive')}>Active</button>}
                        {this.state.activeButton && <button className="active-btn" onClick={(e) => this.updateStatus(profile.id, 0, 'isActive')}>InActive</button>}

                        {/* {!this.state.activeButton && <button className="active-btn" onClick={(e) => this.updateStatus(profile.id, 0, 'isActive')}>InActive</button>}
                        {this.state.activeButton && <button className="active-btn" onClick={(e) => this.updateStatus(profile.id, 1, 'isActive')}>Active</button>} */}

                        {/* activeButton */}

                        {/* {profile.isActive == 1 && <button className="active-btn" onClick={(e) => this.updateStatus(profile.id, 0, 'isActive')}>Active</button>} */}
                        <div>
                            <button className="shop-edit"><i class="fa fa-pencil"></i>Edit</button>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-sm-4">
                        <div className="farm-card bg-white"
                        >
                            <span className="farm-image">
                                {/* <Image
                                src={shopImg}
                                className="maincentext"
                                roundedCircle
                            /> */}
                                {/* <img style={{ transform: `rotate(${rotation}deg)` }} src={shopImg} className="shop-centext" /> */}
                                <ImageZoom
                                    image={{
                                        src: shopImg,
                                        // className: "maincentext",
                                        className: "shop-centext",
                                        style: { transform: `rotate(${rotation}deg)` }
                                    }}
                                    zoomImage={{
                                        src: { shopImg }
                                    }}
                                />
                                {/* <button className="edit-icon" onClick={() => this.editPage(item.id)}><i class="fa fa-pencil"></i></button>  */}
                            </span>

                            {/* <div className="farm-box">
                            <h5 className="centext title">{profile.shopAddress && profile.shopAddress.name}</h5>
                            <span>
                                <div className="centext color-title">
                                    <i class="fa fa-map-marker map-icon" aria-hidden="true"></i>{profile.shopAddressData && profile.shopAddressData.states && profile.shopAddressData.states.name}
                                </div>
                            </span>
                            <div className="farmer-details pl-4">
                                <div className="farmer-address">
                                    <h5 className="title">Address</h5>
                                    <p className="centext user-title sub-farm">
                                        <p>{shopAddress1}</p>
                                        <p></p>
                                        <p>{shopAddress2}</p>
                                        <p></p>
                                        {profile.shopAddressData && profile.shopAddressData.cities && profile.shopAddressData.cities.name + ','}
                                        {profile.shopAddressData && profile.shopAddressData.states && profile.shopAddressData.states.name + ','}
                                        <p></p>
                                        {profile.shopAddressData && profile.shopAddressData.countrys && profile.shopAddressData.countrys.name + '.'}
                                    </p>
                                </div>
                                {/* <div className="farmer-area">
              <h5 className="title mt-4">Total farm area</h5>
              <p className="centext user-title sub-farm">{item.areaSize + 'Sq.ft'}</p>
              </div> */}
                            {/* </div>
                        </div> */}
                        </div>

                        {/* <input type="button" value="left" onClick={this.rotateleft} />
                        <button onClick={() => { this.uploadImage(shopImg) }}>Upload</button> */}
                        <div className="text-center mb-3">
                            <button className="shop-btn" onClick={this.rotateleft}><i class="fa fa-rotate-right"></i>Rotate</button>
                            <button onClick={() => { this.uploadImage(shopImg) }} className="shop-btn">
                                <i class="fa fa-upload" aria-hidden="true"></i>Upload</button>

                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="farm-box">
                            <h4 className="user-title m-0">Shop Name</h4>
                            <p className="title">{profile.shopAddress && profile.shopAddress.name}</p>
                            {/* <span>
                                {/* <div className="centext color-title"> */}
                            {/* <div className="color-title">
                                    <i class="fa fa-map-marker map-icon pl-0" aria-hidden="true"></i>{profile.shopAddressData && profile.shopAddressData.states && profile.shopAddressData.states.name}
                                </div>
                            </span> */}
                            <div className="farmer-details row mt-3">
                                <div className="farmer-address col-md-6 mb-2">
                                    <h4 className="user-title m-0">Shop Address</h4>
                                    <p className="centext title sub-farm">
                                        {profile.shopAddress && profile.shopAddress.address1}
                                        {/* {profile.shopAddress && profile.shopAddress.address2 + ','}
                                        {profile.shopAddressData && profile.shopAddressData.cities && profile.shopAddressData.cities.name + ','}
                                        {profile.shopAddressData && profile.shopAddressData.states && profile.shopAddressData.states.name + ','}
                                        {profile.shopAddressData && profile.shopAddressData.countrys && profile.shopAddressData.countrys.name + '.'} */}
                                    </p>
                                </div>
                                <div className="farmer-address col-md-6 mb-2">
                                    <h4 className="user-title m-0">Shop Type</h4>
                                    <p className="centext title sub-farm">
                                        {profile.shopType && profile.shopType.type}
                                    </p>
                                </div>

                                <div className="farmer-address col-md-6 mb-2">
                                    <h4 className="user-title m-0">Shop Locality</h4>
                                    <p className="centext title sub-farm">
                                        {profile.shopAddress && profile.shopAddress.address2}
                                    </p>
                                </div>


                                <div className="farmer-address col-md-6 mb-2">
                                    <h4 className="user-title m-0">Shop Time</h4>
                                    <p className="centext title sub-farm">
                                        {profile.shopAddress && profile.shopAddress.shopOpeningTime}
                                    </p>
                                </div>
                                <span>
                                    <button className="common-btn mt-2 ml-2">
                                        <a target="_blank" href={mapPinString} className="text-white" ><i class="fa fa-map-marker map-icon pl-0" aria-hidden="true"></i>View on Map</a>
                                    </button>
                                    {/* <div className="color-title">
                                        <button className="common-btn mt-2 ml-0">
                                            <a target="_blank" href={mapPinString} ><i class="fa fa-map-marker map-icon pl-0" aria-hidden="true"></i>View on Map</a>
                                        </button> */}

                                    {/* <i class="fa fa-map-marker map-icon pl-0" aria-hidden="true"></i>{profile.shopAddressData && profile.shopAddressData.states && profile.shopAddressData.states.name} */}
                                    {/* </div> */}
                                    {/* <a href={mapPinString} target="_blank">Open in google map</a> */}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row back-btn">
                    <div className="col-md-6">
                        <button className="common-btn" onClick={this.redirectPage}>Back</button>
                    </div>
                    {this.state.showStatusBtn && profile.status == 0 && <div className="col-md-6 d-flex justify-content-end">
                        <button className="reject-btn" onClick={(e) => this.updateStatus(profile.id, 2)}>Reject</button>
                        <button className="accept-btn" onClick={(e) => this.updateStatus(profile.id, 1)}>Accept</button>
                    </div>}
                </div>
            </div >
            // <Container>
            //     <Row className="show-grid white-bg">
            //         <Col sm={6} md={3} className="ticket-block">
            //             <div className="profile-box">
            //                 <div className="profile-img">
            //                     <Image
            //                         src={imageBaseUrl + profile.shopAddress.image}
            //                         className="centext"
            //                         roundedCircle
            //                     />
            //                 </div>
            //                 <div className="centext">{profile.shopAddress.name}</div>
            //                 <div className="centext">{'Retailer'}</div>
            //             </div>
            //             <div className="count-box" />
            //         </Col>
            //         <Col sm={6} md={9} className="row">
            //             <Col sm={6} md={4}>
            //                 <h5>{'Shop Address 1'}</h5>
            //                 <br />
            //                 <h5>{profile.shopAddress.address1}</h5>
            //             </Col>
            //             <Col sm={6} md={4}>
            //                 <h5>{'Shop Address 2'}</h5>
            //                 <br />
            //                 <h5>{profile.shopAddress.address2}</h5>
            //             </Col>
            //             <Col sm={6} md={3}>
            //                 <h5>{'GST'}</h5>
            //                 <br />
            //                 <h5>{profile.shopAddress.gst}</h5>
            //             </Col>
            //             <Col sm={6} md={5}>
            //                 <h5>{'Shop Location'}</h5>
            //                 <br />
            //                 <h5>{profile.shopAddress.location}</h5>
            //             </Col>
            //         </Col>
            //         <div className="white-bg">
            //             <Button className="EditRetailerInfo" onClick={this.pageRedirect}>{'Edit'}</Button>
            //         </div>
            //     </Row>
            // </Container>
        )
    }
}
// export default ShopDetails;
const mapStatetoProps = (state) => ({

})
export default connect(mapStatetoProps, { SubmitRetailer })(ShopDetails)
