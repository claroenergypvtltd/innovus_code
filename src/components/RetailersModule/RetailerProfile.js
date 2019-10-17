import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';

class RetailerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log('profileData', this.props);
        const profile = this.props.profileData ? this.props.profileData : [];
        const getname = profile && profile.name ? profile.name.split('_') : '';
        return (

            <Container>
                {/* <div classsName="back-btn">
                    <button className="common-button"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                </div> */}
                <Row className="show-grid white-bg">
                    <Col md={3} className="ticket_block">
                        <div className="profile-box">
                            <div className="profile-img">
                                <Image src={imageBaseUrl + profile.image} className="centext" roundedCircle />
                            </div>
                            <div className="profile-title">
                                <h5 className="centext title">{getname[0]} {getname[1]}</h5>
                                <span className="centext color-title">{"Retailer"}</span>
                            </div>
                        </div>
                        <div className="count-box">

                        </div>
                        <div className="count-box" />
                    </Col>
                    <Col md={9} className="row pt-5 pl-5">
                        <Col md={2} className="p-0">
                            <h4 className="title">{"Customer Id"}</h4>
                            <p className="user-subtitle">{'CU001839'}</p>
                        </Col>
                        <Col md={2}>
                            <h4 className="title">{"Agent Id"}</h4>
                            <p className="user-subtitle">{'AG001679'}</p>
                        </Col>
                        <Col md={2}>
                            <h4 className="title">{"Email"}</h4>
                            <p className="user-subtitle">{profile.emailId ? profile.emailId : '-'}</p>
                        </Col>
                        <Col md={2}>
                            <h4 className="title">{"Phone"}</h4>
                            <p className="user-subtitle">{profile.mobileNumber ? profile.mobileNumber : '-'}</p>

                        </Col>
                        <Col md={3}>
                            <h4 className="title">{"Address"}</h4>
                            <p className="user-subtitle">{profile.address && profile.address.address1 ? profile.address.address1 : '-'}</p>
                        </Col>
                    </Col>
                </Row>
            </Container >
        );
    }
}
export default RetailerProfile; 
