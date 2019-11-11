import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import PropTypes from "prop-types";
import noimg from '../../assets/noimage/Avatar_farmer.png'
import { updateStatusRetailer } from '../../actions/SubmitRetailerAction';
import { toastr } from '../../services/toastr.services'
import { path } from '../../constants';
import ImageZoom from 'react-medium-image-zoom'

class ShopDetails extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            showStatusBtn: true
        };
    }

    redirectPage = () => {
        this.context.router.history.goBack();
    }
    updateStatus(RetId, status) {
        let message = window.strings.UPDATEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => {
                const formData = new FormData();
                formData.append("userId", RetId);
                formData.append("roleId", 2);
                formData.append("status", status);
                updateStatusRetailer(formData).then(resp => {
                    if (resp && resp.status == 200) {
                        // toastr.success(resp.message);
                        this.setState({
                            showStatusBtn: false
                        })
                    }
                })
                this.context.router.history.goBack();
            },
            onCancel: () => { }
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.UPDATERETSTATUS);
    }

    render() {
        let shopAddLat;
        let shopAddLong
        const profile = this.props.profileData ? this.props.profileData : [];
        let shopAddress1 = profile.shopAddress && profile.shopAddress.address1 ? profile.shopAddress.address1 : '';
        let shopAddress2 = profile.shopAddress && profile.shopAddress.address2 ? profile.shopAddress.address2 : '';
        let loc = [{ "lat": "9.91783", "long": "78.1213" }]
        // console.log("---loc----", JSON.parse(profile.shopAddress.location))

        // debugger;
        loc.map((item, index) => {
            shopAddLat = item.lat
            shopAddLong = item.long
        })
        // console.log("---loc----", profile.shopAddress.location.split(""))
        // let parseLocaddress = parseLoc.split('"', 2)
        // let shopAddressLat = profile.shopAddress && profile.shopAddress.location ? profile.shopAddress.lat : '';
        // let shopAddressLng = profile.shopAddress && profile.shopAddress.location ? profile.shopAddress.lng : '';
        let shopImg = noimg;
        if (profile.shopAddress && profile.shopAddress.image) {
            shopImg = imageBaseUrl + profile.shopAddress.image
        }
        let mapPinString = "http://www.google.com/maps/place/" + shopAddLat + ',' + shopAddLong
        // const getname = profile.name.split('_');
        return (
            <div className="farm-tab p-1">
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
                                <ImageZoom
                                    image={{
                                        src: shopImg,
                                        // className: "maincentext",
                                        className: "shop-centext",

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
                    </div>
                    <div className="col-sm-4">
                        <div className="farm-box">
                            <h4 className="user-title">Shop Name</h4>
                            <p className="title">{profile.shopAddress && profile.shopAddress.name}</p>
                            {/* <span>
                                {/* <div className="centext color-title"> */}
                            {/* <div className="color-title">
                                    <i class="fa fa-map-marker map-icon pl-0" aria-hidden="true"></i>{profile.shopAddressData && profile.shopAddressData.states && profile.shopAddressData.states.name}
                                </div>
                            </span> */}
                            <div className="farmer-details mt-3">
                                <div className="farmer-address">
                                    <h4 className="user-title">Address</h4>
                                    <p className="centext title sub-farm">
                                        {profile.shopAddress && profile.shopAddress.address1 + '' + profile.shopAddress && profile.shopAddress.address2 + ','}
                                        {profile.shopAddressData && profile.shopAddressData.cities && profile.shopAddressData.cities.name + ','}
                                        {profile.shopAddressData && profile.shopAddressData.states && profile.shopAddressData.states.name + ','}
                                        {profile.shopAddressData && profile.shopAddressData.countrys && profile.shopAddressData.countrys.name + '.'}
                                    </p>
                                </div>
                                <span>
                                    <button className="common-btn mt-2 ml-0">
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
                        <button className="accept-btn" onClick={(e) => this.updateStatus(profile.id, 1)}>Accept</button>
                        <button className="reject-btn" onClick={(e) => this.updateStatus(profile.id, 2)}>Reject</button>
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
export default ShopDetails;
