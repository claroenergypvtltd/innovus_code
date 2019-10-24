import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import { connect } from 'react-redux';
import { fetchRetailers } from '../../actions/SubmitRetailerAction';
import noimg from '../../assets/noimage/Avatar_farmer.png'

class RetailerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    // componentWillReceiveProps(newProps) {
    //     let retailerData = newProps.retailerdetails.Lists;
    //     this.setState({ profileData: newProps.retailerdetails.Lists })

    // }

    // componentDidMount() {
    //     if (this.props.retailerId) {
    //         let user = {};
    //         user.retailerId = this.props.retailerId;
    //         user.isEdit = true;
    //         this.props.fetchRetailers(user);
    //     }
    // }


    render() {
        const profile = this.props.profileData ? this.props.profileData : [];
        const getname = profile && profile.name ? profile.name.split('_') : '';
        let RetImg = noimg;
        if (profile && profile.image) {
            RetImg = imageBaseUrl + profile.image
        }
        return (

            <Container>
                {/* <div classsName="back-btn">
                    <button className="common-button"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                </div> */}
                <Row className="show-grid white-bg">
                    {/* <Col md={3} className="ticket-block">
                        <div className="profile-box">
                            <div className="profile-img">
                                <Image src={RetImg} className="centext" roundedCircle />
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
                    <Col md={9} className="row pt-5 m-0">
                        <Col md={2} className="p-0">
                            <h4 className="title">{"Customer Id"}</h4>
                            <p className="user-subtitle">{profile.cusId}</p>
                        </Col>
                        <Col md={2} className="p-0">
                            <h4 className="title">{"Agent Id"}</h4>
                            <p className="user-subtitle">{profile.agentId}</p>
                        </Col>
                        <Col md={2} className="p-0">
                            <h4 className="title">{"Email"}</h4>
                            <p className="user-subtitle">{profile.emailId ? profile.emailId : '-'}</p>
                        </Col>
                        <Col md={2} className="p-0">
                            <h4 className="title">{"Phone"}</h4>
                            <p className="user-subtitle">{profile.mobileNumber ? profile.mobileNumber : '-'}</p>

                        </Col>
                        <Col md={3} className="p-0">
                            <h4 className="title">{"Address"}</h4>
                            <p className="user-subtitle">{profile.address && profile.address.address1 ? profile.address.address1 : '-'}</p>
                        </Col>
                    </Col> */}


                    {/* RESPONSIVE */}

                    <Col md={3} sm={6} xs={12} className="ticket-block">
                        <div className="profile-box">
                            <div className="profile-img">
                                <Image src={RetImg} className="centext" roundedCircle />
                            </div>
                            <div className="profile-title">
                                <h5 className="centext title">{getname[0]} {getname[1]}</h5>
                                <span className="centext color-title">{"Retailer"}</span>
                            </div>
                        </div>
                        {/* <div className="count-box">

                        </div>
                        <div className="count-box" /> */}
                    </Col>
                    <Col md={9} sm={6} xs={12} className="row pt-5 m-0">
                        <Col md={2} sm={6} xs={12} className="p-0">
                            <h4 className="title">{"Customer Id"}</h4>
                            <p className="user-subtitle">{profile.cusId}</p>
                        </Col>
                        <Col md={2} sm={6} xs={12} className="p-0">
                            <h4 className="title">{"Agent Id"}</h4>
                            <p className="user-subtitle">{profile.agentId}</p>
                        </Col>
                        <Col md={2} sm={6} xs={12} className="p-0">
                            <h4 className="title">{"Email"}</h4>
                            <p className="user-subtitle">{profile.emailId ? profile.emailId : '-'}</p>
                        </Col>
                        <Col md={2} sm={6} xs={12} className="p-0">
                            <h4 className="title">{"Phone"}</h4>
                            <p className="user-subtitle">{profile.mobileNumber ? profile.mobileNumber : '-'}</p>

                        </Col>
                        <Col md={3} sm={6} xs={12} className="p-0">
                            <h4 className="title">{"Address"}</h4>
                            <p className="user-subtitle">{profile.address && profile.address.address1 ? profile.address.address1 : '-'}</p>
                        </Col>
                    </Col>
                </Row>
            </Container >
        );
    }
}
const mapStateToProps = state => ({
    retailerdetails: state.retailer,
});

export default connect(
    mapStateToProps,
    { fetchRetailers },
)(RetailerProfile);

