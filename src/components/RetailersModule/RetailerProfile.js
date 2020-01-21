import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import { connect } from 'react-redux';
import { fetchRetailers, SubmitRetailer } from '../../actions/SubmitRetailerAction';
import { toastr } from '../../services/toastr.services'
import noimg from '../../assets/noimage/Avatar_farmer.png'
import { formatDate } from '../../shared/DateFormat'
import UpdateSecondary from './UpdateSecondary'
import { resorceJSON, ModalData } from '../../libraries'
import { path } from '../../constants';
import PropTypes from "prop-types";
import ViewSecondary from './ViewSecondary'

class RetailerProfile extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            statusClass: ''
        };
    }
    addSecondary = (e) => {
        e.preventDefault();
        this.setState({ open: true })
    }

    viewSecondary = (e) => {
        e.preventDefault();
        this.setState({ openView: true })
    }

    onCloseViewModal = () => {
        this.setState({ openView: false });
    };

    // removeSecondary = (userId, Id) => {
    //     let message = "Are you sure you want to Remove ?";
    //     const toastrConfirmOptions = {
    //         onOk: () => { this.removeRetailer(userId, Id) },
    //         onCancel: () => {
    //         }
    //     };
    //     toastr.confirm(message, toastrConfirmOptions, "Remove")
    // }

    // removeRetailer = (userId, Id) => {
    //     const formData = new FormData();
    //     formData.append("mobileNumbers", '');
    //     formData.append("names", '');
    //     formData.append("userId", Id);
    //     formData.append("flag", 5);
    //     formData.append("id", userId);
    //     this.props.SubmitRetailer(formData, true);
    // }



    onOpenModal = (orderId) => {
        this.setState({ open: true, orderId: orderId });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    redirectPage = () => {
        this.props.redirectViewPage();
        this.onCloseModal();
    }
    // getStatus() {
    //     let profileData = this.props.profileData
    //     if (profileData.isActive == 0) {
    //         statusClass = window.strings.RETAILERS.INACTIVE
    //     }
    //     else if (profileData.status == 0 && profileData.isActive == 1) {
    //         statusClass = window.strings.RETAILERS.PENDING
    //     }
    //     else if (profileData.status == 1 && profileData.isActive == 1) {
    //         statusClass = window.strings.RETAILERS.ACCEPTED
    //     }
    //     else if (profileData.status == 2 && profileData.isActive == 1) {
    //         statusClass = window.strings.RETAILERS.REJECTED
    //     }
    //     this.setState({ statusClass })
    // }

    render() {
        const profile = this.props.profileData ? this.props.profileData : [];
        const secName = profile && profile.userMobiles && profile.userMobiles[0] && profile.userMobiles[0].name;
        const secMobile = profile && profile.userMobiles && profile.userMobiles[0] && profile.userMobiles[0].mobileNumber;
        const getname = profile && profile.name ? profile.name.split('_') : '';
        let status = profile.status
        let RetImg = noimg;
        if (profile && profile.image) {
            RetImg = imageBaseUrl + profile.image
        }
        let statusClass;
        // if (status == 0) {
        //     statusClass = window.strings.RETAILERS.PENDING
        // } else if (status == 1) {
        //     statusClass = window.strings.RETAILERS.ACCEPTED
        // } else {
        //     statusClass = window.strings.RETAILERS.REJECTED
        // }

        if (profile.isActive == 0) {
            statusClass = window.strings.RETAILERS.INACTIVE
        }
        else if (profile.status == 0 && profile.isActive == 1) {
            statusClass = window.strings.RETAILERS.PENDING
        }
        else if (profile.status == 1 && profile.isActive == 1) {
            statusClass = window.strings.RETAILERS.ACCEPTED
        }
        else if (profile.status == 2 && profile.isActive == 1) {
            statusClass = window.strings.RETAILERS.REJECTED
        }
        if (profile.status == 2) {
            statusClass = window.strings.RETAILERS.REJECTED
        }

        let paramObj = {
            "mobileNumber": profile.mobileNumber,
            "userId": profile.id
        }
        let UpdateSecondaryData = <UpdateSecondary onHide={this.onCloseModal} orderId={this.state.orderId} onCloseModal={this.onCloseModal} Data={paramObj} redirect={this.redirectPage} />
        let viewSecondaryData = <ViewSecondary onHide={this.onCloseModal} orderId={this.state.orderId} onCloseModal={this.onCloseViewModal} Data={profile.userMobiles} redirect={this.redirectPage} />

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
                        {/* {statusClass == "accepted" && !secName && !secMobile ? <div><a href="" onClick={(e) => this.addSecondary(e)} className="level-btn"><i className="fa fa-plus level-plus"></i>Add Secondary Level</a>
                            <a href="" onClick={(e) => this.viewSecondary(e)} className="level-btn"><i className=" level-plus"></i>  View Secondary Level</a></div>
                            : ((secName || secMobile) && statusClass != "inactive") ?
                                <div className="secondary-level">
                                    <Col md={2} sm={6} xs={12} className="p-0">
                                        <h4 className="title">{"Secondary Name"}</h4>
                                        <p className="user-subtitle">{secName}</p>
                                    </Col>
                                    <Col md={2} sm={6} xs={12} className="p-0">
                                        <h4 className="title">{"Secondary Phone"}</h4>
                                        <p className="user-subtitle">{secMobile}</p>
                                    </Col>
                                    <Col md={2} sm={6} xs={12} className="p-0">
                                        <button className="remove-btn" onClick={() => this.removeSecondary(profile.userMobiles[0].id, profile.id)}>Remove</button>
                                    </Col>
                                </div> : ''
                        } */}
                        {statusClass == "accepted" && statusClass != "inactive" ?
                            <div>
                                <a href="" onClick={(e) => this.addSecondary(e)} className="level-btn"><i className="fa fa-plus level-plus"></i>Add Secondary Level</a>
                                <a href="" onClick={(e) => this.viewSecondary(e)} className="level-btn"><i className=" level-plus"></i>  View Secondary Level</a>
                            </div>
                            :
                            ''
                        }
                        <ModalData show={this.state.open} onHide={this.onCloseModal} onClick={this.handleSubmit} modalData={UpdateSecondaryData} ModalTitle="UPDATE SECONDARY FIELD" />
                        <ModalData show={this.state.openView} onHide={this.onCloseViewModal} modalData={viewSecondaryData} ModalTitle="VIEW SECONDARY DATA" />
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

