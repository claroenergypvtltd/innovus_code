import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';

class FarmerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log('profileData', this.props);
    const profile = this.props.profileData;
    return (
      <Container>
        <Row className="show-grid white-bg">
          <Col sm={6} md={3} className="ticket_block">
            <div className="profile-box">
              <div className="profile-img">
                <Image
                  src={imageBaseUrl + profile.image}
                  className="centext"
                  roundedCircle
                />
              </div>
              <div className="centext">{profile.name}</div>
              <div className="centext">{'Farmer'}</div>
            </div>
            <div className="count-box" />
          </Col>
          <Col sm={6} md={9} className="row">
            <Col sm={6} md={4}>
              <h5>{'Email'}</h5>
              <br />
              <h5>{profile.emailId}</h5>
            </Col>
            <Col sm={6} md={3}>
              <h5>{'Phone'}</h5>
              <br />
              <h5>{profile.mobileNumber}</h5>
            </Col>
            <Col sm={6} md={5}>
              <h5>{'Address'}</h5>
              <br />
              <h5>{profile.mobileNumber}</h5>
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default FarmerProfile;
