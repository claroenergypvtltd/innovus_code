import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import PropTypes from "prop-types";
import noimg from '../../assets/noimage/Avatar_farmer.png'

class ShopDetails extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }

    redirectPage = () => {
        this.context.router.history.goBack();
    }

    render() {
        const profile = this.props.profileData ? this.props.profileData : [];
        let shopImg = noimg;
        if (profile.shopAddress && profile.shopAddress.image) {
            shopImg = imageBaseUrl + profile.shopAddress.image
        }
        // const getname = profile.name.split('_');
        return (
            <div className="farm-tab p-1">
                <div className="col-sm-4">
                    <div className="farm-card bg-white"
                    >
                        <span className="farm-image">
                            <Image
                                src={shopImg}
                                className="maincentext"
                                roundedCircle
                            />
                            {/* <button className="edit-icon" onClick={() => this.editPage(item.id)}><i class="fa fa-pencil"></i></button>  */}
                        </span>
                        <div className="farm-box">
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
                                        {profile.shopAddress && profile.shopAddress.address1 + '' + profile.shopAddress && profile.shopAddress.address2 + ','}
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row back-btn">
                    <div className="col-md-6">
                        <button className="common-btn" onClick={this.redirectPage}>Back</button>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <button className="accept-btn" onClick={this.redirectPage}>Accept</button>
                        <button className="reject-btn" onClick={this.redirectPage}>Reject</button>
                    </div>
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
