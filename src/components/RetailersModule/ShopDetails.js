import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';

class ShopDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }
    render() {
        console.log('profileData', this.props);
        const profile = this.props.profileData;
        const getname = profile.name.split('_');
        return (
            <div className="col-sm-4">

                <div

                    className="farm-card bg-white"
                // onClick={() => this.getFarmDetails(item.id)}
                >
                    <span className="farm-image">
                        <Image
                            src={imageBaseUrl + profile.shopAddress.image}
                            className="maincentext"
                            roundedCircle
                        />
                        {/* <button className="edit-icon" onClick={() => this.editPage(item.id)}><i class="fa fa-pencil"></i></button>  */}
                    </span>
                    <div className="farm-box">
                        <h5 className="centext title">{profile.shopAddress.name}</h5>
                        <span>
                            <div className="centext color-title">
                                <i class="fa fa-map-marker map-icon" aria-hidden="true"></i>{profile.shopAddress.state}
                            </div>
                        </span>
                        <div className="farmer-details pl-4">
                            <div className="farmer-address">
                                <h5 className="title">Address</h5>
                                <p className="centext user-title sub-farm">
                                    {profile.shopAddress.address1 + '' + profile.shopAddress.address2}
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
            // <Container>
            //     <Row className="show-grid white-bg">
            //         <Col sm={6} md={3} className="ticket_block">
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
