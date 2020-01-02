import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import { connect } from 'react-redux';
import { fetchRetailers, SubmitRetailer } from '../../actions/SubmitRetailerAction';
import noimg from '../../assets/noimage/Avatar_farmer.png'
import { formatDate } from '../../shared/DateFormat'
import UpdateSecondary from './UpdateSecondary'
import { resorceJSON, ModalData } from '../../libraries'
import { path } from '../../constants';
import PropTypes from "prop-types";

class RetailerProfile extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    addSecondary = (e) => {
        e.preventDefault();
        this.setState({ open: true })
    }

    removeSecondary = (userId) => {
        const formData = new FormData();
        formData.append("mobileNumbers", '');
        formData.append("name", '');
        formData.append("userId", userId);
        formData.append("flag", 5);
        this.props.SubmitRetailer(formData, true);
    }

    onOpenModal = (orderId) => {
        this.setState({ open: true, orderId: orderId });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    redirectPage = () => {
        this.context.router.history.push({ pathname: path.user.list, state: { retlrbckTrack: "backTrue" } })
    }

    render() {
        const profile = this.props.profileData ? this.props.profileData : [];
        const getname = profile && profile.name ? profile.name.split('_') : '';
        let status = profile.status
        let RetImg = noimg;
        if (profile && profile.image) {
            RetImg = imageBaseUrl + profile.image
        }
        let statusClass;
        if (status == 0) {
            statusClass = window.strings.RETAILERS.PENDING
        } else if (status == 1) {
            statusClass = window.strings.RETAILERS.ACCEPTED
        } else {
            statusClass = window.strings.RETAILERS.REJECTED
        }
        let paramObj = {
            "mobileNumber": profile.mobileNumber,
            "userId": profile.id
        }
        let UpdateSecondaryData = <UpdateSecondary onHide={this.onCloseModal} orderId={this.state.orderId} onCloseModal={this.onCloseModal} Data={paramObj} redirect={this.redirectPage} />
        return (

            <Container className="retailer-container">
                <Row className="show-grid white-bg">
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
                    </Col>
                    <Col md={9} sm={6} xs={12} className="row pt-5 m-0">
                        <Col md={2} sm={6} xs={12} className="p-0">
                            <h4 className="title">{"Customer Id"}</h4>
                            <p className="user-subtitle">{profile.cusId}</p>
                        </Col>
                        <Col md={2} sm={6} xs={12} className="p-0">
                            <h4 className="title">{"Agent Name"}</h4>
                            <p className="user-subtitle">{profile.agentName ? profile.agentName : '-'}</p>
                        </Col>
                        <Col md={2} sm={6} xs={12} className="p-0">
                            <h4 className="title">{"Phone"}</h4>
                            <p className="user-subtitle">{profile.mobileNumber ? profile.mobileNumber : '-'}</p>
                        </Col>
                        <Col md={2} sm={6} xs={12} className="p-0">
                            <h4 className="title">{"Status"}</h4>
                            <p className={'user-subtitle '}>{statusClass}</p>
                        </Col>
                        <Col md={3} sm={6} xs={12} className="p-0">
                            <h4 className="title">{"Onboarded Date"}</h4>
                            <p className={'user-subtitle'}>{formatDate(profile.created)}</p>
                        </Col>
                        {statusClass == "accepted" && !profile.name && !profile.mobileNumbers ? <a href="" onClick={(e) => this.addSecondary(e)} className="level-btn"><i className="fa fa-plus level-plus"></i>Add Secondary Level</a>
                            :
                            <div className="secondary-level">
                                <Col md={2} sm={6} xs={12} className="p-0">
                                    <h4 className="title">{"Name"}</h4>
                                    <p className="user-subtitle">{profile.name}</p>
                                </Col>
                                <Col md={2} sm={6} xs={12} className="p-0">
                                    <h4 className="title">{"Phone"}</h4>
                                    <p className="user-subtitle">{profile.mobileNumbers}</p>
                                </Col>
                                <Col md={2} sm={6} xs={12} className="p-0">
                                    <button className="remove-btn" onClick={() => this.removeSecondary(profile.id)}>Remove</button>
                                </Col>
                            </div>
                        }
                        <ModalData show={this.state.open} onHide={this.onCloseModal} onClick={this.handleSubmit} modalData={UpdateSecondaryData} ModalTitle="UPDATE SECONDARY FIELD" />
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
    { fetchRetailers, SubmitRetailer },
)(RetailerProfile);

