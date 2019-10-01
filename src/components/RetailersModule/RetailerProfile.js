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
        const profile = this.props.profileData;
        const getname = profile.name.split('_');
        return (
            <Container>
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
                            <div className="sub-farmer row">
                                <span className="icon split-farm">1</span>
                                <span className="icon1">30</span>
                            </div>
                        </div>
                        <div className="count-box">

                        </div>
                        <div className="count-box" />
                    </Col>
                    <Col md={9} className="row pt-5 pl-5">

                        <Col md={4}>
                            <h4 className="user-title">{"Email"}</h4>
                            <p className="user-subtitle">{profile.emailId}</p>
                        </Col>
                        <Col md={3}>

                            <h4 className="user-title">{"Phone"}</h4>
                            <p className="user-subtitle">{profile.mobileNumber}</p>

                        </Col>
                        <Col md={5}>
                            <h4 className="user-title">{"Address"}</h4>
                            <p className="user-subtitle">{profile.address && profile.address.address1}</p>
                        </Col>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default RetailerProfile; 
